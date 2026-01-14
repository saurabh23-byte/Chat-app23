import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../config.js";
import { useDispatch } from "react-redux";
import { removeMessage } from "../redux/messageSlice";



const Message = ({ message }) => {
  const scroll = useRef();
  const { authUser, selectedUser } = useSelector((store) => store.user);
  const [showDelete, setShowDelete] = useState(false);

  const isSender =
    message?.senderId?.toString() === authUser?._id?.toString();

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  // 🗑️ DELETE FOR ME
const dispatch = useDispatch();

const handleDelete = async () => {
  try {
    await axios.delete(
      `${BASE_URL}/api/v1/message/delete-for-me/${message._id}`,
      { withCredentials: true }
    );

    // 👇 REMOVE FROM UI INSTANTLY
    dispatch(removeMessage(message._id));

  } catch (err) {
    console.log(err);
  }
};


  return (
    <>
      <div
        ref={scroll}
        className={`flex ${isSender ? "justify-end" : "justify-start"} mb-2 px-2`}
      >
        {/* Avatar (receiver only) */}
        {!isSender && (
          <div className="mr-2">
            <img
              src={selectedUser?.profilePhoto}
              alt="avatar"
              className="w-8 h-8 rounded-full"
            />
          </div>
        )}

        {/* Message Bubble */}
        <div
          onContextMenu={(e) => {
            e.preventDefault();
            setShowDelete(true);
          }}
          className={`relative px-3 py-2 text-sm rounded-lg
            max-w-[65%]
            break-words
            whitespace-pre-wrap
            overflow-hidden
            cursor-pointer
            ${
              isSender
                ? "bg-green-600 text-white rounded-br-none"
                : "bg-gray-700 text-white rounded-bl-none"
            }
          `}
        >
          <p className="pr-10">{message?.message}</p>

          <span className="absolute bottom-1 right-2 text-[10px] opacity-70">
            {new Date(message?.createdAt).toLocaleTimeString("en-IN", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })}
          </span>
        </div>
      </div>

      {/* 🧾 DELETE POPUP */}
      {showDelete && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          onClick={() => setShowDelete(false)}
        >
          <div
            className="bg-gray-800 text-white rounded-lg w-64 p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-sm mb-4">Delete message?</p>

            <div className="flex justify-end gap-4 text-sm">
              <button
                className="text-gray-400 hover:text-white"
                onClick={() => setShowDelete(false)}
              >
                Cancel
              </button>

              <button
                className="text-red-400 hover:text-red-500"
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
    </>
  );
};

export default Message;
