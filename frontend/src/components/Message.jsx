import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { BASE_URL } from "..";
import { removeMessage } from "../redux/messageSlice";

const Message = ({ message }) => {
  const scroll = useRef(null);
  const dispatch = useDispatch();

  const { authUser, selectedUser } = useSelector((store) => store.user);

  const [showDelete, setShowDelete] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedMessage, setEditedMessage] = useState(message?.message || "");
  const [isSaving, setIsSaving] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const isSender =
    message?.senderId?.toString() === authUser?._id?.toString();

  // 5-minute edit rule
  const EDIT_TIME = 5 * 60 * 1000;
  const canEdit =
    isSender &&
    Date.now() - new Date(message?.createdAt).getTime() < EDIT_TIME;

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  // Delete message
  const handleDelete = async () => {
    try {
      await axios.delete(
        `${BASE_URL}/api/v1/message/delete-for-me/${message._id}`,
        { withCredentials: true }
      );
      dispatch(removeMessage(message._id));
    } catch (err) {
      console.log(err);
    }
  };

  // Save edited message
  const handleSaveEdit = async () => {
    if (!editedMessage.trim()) return;

    try {
      setIsSaving(true);
      const res = await axios.put(
        `${BASE_URL}/api/v1/message/edit/${message._id}`,
        { newMessage: editedMessage },
        { withCredentials: true }
      );

      message.message = res.data.msg.message;
      message.editedAt = res.data.msg.editedAt;
      setIsEditing(false);
    } catch (err) {
      console.log(err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      {/* MESSAGE ROW */}
      <div
        ref={scroll}
        className={`flex w-full mb-2 px-2 ${
          isSender ? "justify-end" : "justify-start"
        }`}
      >
        {!isSender && (
          <img
            src={selectedUser?.profilePhoto}
            alt="avatar"
            className="w-8 h-8 rounded-full mr-2 self-end"
          />
        )}

        {/* MESSAGE BUBBLE */}
        <div className="max-w-[65%]">
          <div
            onContextMenu={(e) => {
              e.preventDefault();
              setShowDelete(true);
            }}
            className={`relative rounded-lg text-sm break-words whitespace-pre-wrap
              ${
                isSender
                  ? "bg-green-600 text-white rounded-br-none"
                  : "bg-gray-700 text-white rounded-bl-none"
              }
              ${message?.image ? "p-2" : "px-3 py-2"}
            `}
          >
            {/* EDIT MODE */}
            {isEditing ? (
              <textarea
                value={editedMessage}
                onChange={(e) => setEditedMessage(e.target.value)}
                className="w-full bg-transparent border border-gray-500 rounded p-1 text-sm resize-none"
                rows={2}
                autoFocus
              />
            ) : (
              <div className="flex flex-col gap-1">
                {/* IMAGE */}
                {message?.image && (
                  <img
                    src={`${BASE_URL}${message.image}`}
                    alt="sent"
                    className="max-w-[220px] rounded-lg cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      setPreviewImage(message.image);
                    }}
                  />
                )}

                {/* TEXT + TIME (INLINE FIXED) */}
                {message?.message && (
                  <div className="flex flex-wrap items-end gap-x-1">
                    <span className="break-words">
                      {message.message}
                    </span>

                    <span className="text-[10px] opacity-70 whitespace-nowrap">
                      {message?.editedAt && "(edited) "}
                      {new Date(message?.createdAt).toLocaleTimeString(
                        "en-IN",
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        }
                      )}
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* EDIT BUTTON */}
            {canEdit && !isEditing && !message?.image && (
              <button
                className="absolute top-1 right-1 text-xs text-gray-300"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsEditing(true);
                }}
              >
                Edit
              </button>
            )}

            {/* EDIT ACTIONS */}
            {isEditing && (
              <div className="absolute top-1 right-1 flex gap-2">
                <button
                  className="text-xs text-green-400"
                  onClick={handleSaveEdit}
                  disabled={isSaving}
                >
                  {isSaving ? "Saving..." : "Save"}
                </button>
                <button
                  className="text-xs text-red-400"
                  onClick={() => {
                    setIsEditing(false);
                    setEditedMessage(message?.message || "");
                  }}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* DELETE MODAL */}
      {showDelete && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/40"
          onClick={() => setShowDelete(false)}
        >
          <div
            className="bg-gray-800 text-white rounded-lg w-64 p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-sm mb-4">Delete message?</p>
            <div className="flex justify-end gap-4 text-sm">
              <button
                className="text-gray-400"
                onClick={() => setShowDelete(false)}
              >
                Cancel
              </button>
              <button
                className="text-red-400"
                onClick={() => {
                  handleDelete();
                  setShowDelete(false);
                }}
              >
                Delete for me
              </button>
            </div>
          </div>
        </div>
      )}

      {/* IMAGE PREVIEW */}
      {previewImage && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center"
          onClick={() => setPreviewImage(null)}
        >
          <img
            src={`${BASE_URL}${previewImage}`}
            className="max-h-[90vh] max-w-[90vw] rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
};

export default Message;
