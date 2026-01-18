// import React, { useEffect, useRef, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import axios from "axios";
// import { BASE_URL } from '..';
// import { removeMessage } from "../redux/messageSlice";

// const Message = ({ message }) => {
//   const scroll = useRef();
//   const dispatch = useDispatch();

//   const { authUser, selectedUser } = useSelector((store) => store.user);

//   const [showDelete, setShowDelete] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editedMessage, setEditedMessage] = useState(message?.message || "");
//   const [isSaving, setIsSaving] = useState(false);

//   const isSender =
//     message?.senderId?.toString() === authUser?._id?.toString();

//   // ⏳ 5-minute edit rule
//   const EDIT_TIME = 5 * 60 * 1000;
//   const canEdit =
//     isSender &&
//     Date.now() - new Date(message?.createdAt).getTime() < EDIT_TIME;

//   useEffect(() => {
//     scroll.current?.scrollIntoView({ behavior: "smooth" });
//   }, [message]);

//   // 🗑️ Delete for me
//   const handleDelete = async () => {
//     try {
//       await axios.delete(
//         `${BASE_URL}/api/v1/message/delete-for-me/${message._id}`,
//         { withCredentials: true }
//       );
//       dispatch(removeMessage(message._id));
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   // ✏️ Save edited message
//   const handleSaveEdit = async () => {
//     if (!editedMessage.trim()) return;

//     try {
//       setIsSaving(true);

//       const res = await axios.put(
//         `${BASE_URL}/api/v1/message/edit/${message._id}`,
//         { newMessage: editedMessage },
//         { withCredentials: true }
//       );

//       // update locally
//       message.message = res.data.msg.message;
//       message.editedAt = res.data.msg.editedAt;

//       setIsEditing(false);
//     } catch (err) {
//       console.log(err.response?.data?.message || "Edit failed");
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   return (
//     <>
//       <div
//         ref={scroll}
//         className={`flex ${isSender ? "justify-end" : "justify-start"} mb-2 px-2`}
//       >
//         {!isSender && (
//           <img
//             src={selectedUser?.profilePhoto}
//             alt="avatar"
//             className="w-8 h-8 rounded-full mr-2"
//           />
//         )}

//         Message Bubble
//         <div
//           onContextMenu={(e) => {
//             e.preventDefault();
//             setShowDelete(true);
//           }}
//           className={`relative px-3 py-2 text-sm rounded-lg max-w-[65%]
//           ${isSender
//               ? "bg-green-600 text-white rounded-br-none"
//               : "bg-gray-700 text-white rounded-bl-none"}
//           `}
//         >
//           {/* Message text / edit box */}
//           {isEditing ? (
//             <textarea
//               value={editedMessage}
//               onChange={(e) => setEditedMessage(e.target.value)}
//               className="w-full bg-transparent border border-gray-500 rounded p-1 text-sm resize-none"
//               rows={2}
//               autoFocus
//             />
//           ) : (
//             <p className="pr-10 flex items-center gap-1">
//               {message?.message}
//               {message?.editedAt && (
//                 <span className="text-[10px] opacity-70">•</span>
//               )}
//             </p>
//           )}

//           {/* Edit buttons */}
//           {canEdit && !isEditing && (
//             <button
//               className="absolute top-1 right-1 text-xs text-gray-300"
//               onClick={() => setIsEditing(true)}
//             >
//               Edit
//             </button>
//           )}

//           {isEditing && (
//             <div className="absolute top-1 right-1 flex gap-2">
//               <button
//                 className="text-xs text-green-400"
//                 onClick={handleSaveEdit}
//                 disabled={isSaving}
//               >
//                 {isSaving ? "Saving..." : "Save"}
//               </button>
//               <button
//                 className="text-xs text-red-400"
//                 onClick={() => {
//                   setIsEditing(false);
//                   setEditedMessage(message?.message || "");
//                 }}
//               >
//                 Cancel
//               </button>
//             </div>
//           )}

//           {/* Time */}
//           <span className="absolute bottom-1 right-2 text-[10px] opacity-70">
//             {new Date(message?.createdAt).toLocaleTimeString("en-IN", {
//               hour: "2-digit",
//               minute: "2-digit",
//               hour12: true,
//             })}
//           </span>
//         </div>
//       </div>

//       {/* Delete popup */}
//       {showDelete && (
//         <div
//           className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
//           onClick={() => setShowDelete(false)}
//         >
//           <div
//             className="bg-gray-800 text-white rounded-lg w-64 p-4"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <p className="text-sm mb-4">Delete message?</p>

//             <div className="flex justify-end gap-4 text-sm">
//               <button
//                 className="text-gray-400"
//                 onClick={() => setShowDelete(false)}
//               >
//                 Cancel
//               </button>

//               <button
//                 className="text-red-400"
//                 onClick={() => {
//                   handleDelete();
//                   setShowDelete(false);
//                 }}
//               >
//                 Delete for me
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Message;




















// import React, { useEffect, useRef, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import axios from "axios";
// import { BASE_URL } from "..";
// import { removeMessage, updateMessageReaction } from "../redux/messageSlice";

// const Message = ({ message }) => {
//   const scroll = useRef(null);
//   const dispatch = useDispatch();

//   const { authUser, selectedUser } = useSelector((store) => store.user);

//   const [showDelete, setShowDelete] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editedMessage, setEditedMessage] = useState(message?.message || "");
//   const [isSaving, setIsSaving] = useState(false);
//   const [showReactions, setShowReactions] = useState(false);

//   const emojis = ["👍", "❤️", "😂", "😮"];

//   const isSender =
//     message?.senderId?.toString() === authUser?._id?.toString();

//   const EDIT_TIME = 5 * 60 * 1000;
//   const canEdit =
//     isSender &&
//     Date.now() - new Date(message?.createdAt).getTime() < EDIT_TIME;

//   useEffect(() => {
//     scroll.current?.scrollIntoView({ behavior: "smooth" });
//   }, [message]);

//   // 🗑️ Delete
//   const handleDelete = async () => {
//     try {
//       await axios.delete(
//         `${BASE_URL}/api/v1/message/delete-for-me/${message._id}`,
//         { withCredentials: true }
//       );
//       dispatch(removeMessage(message._id));
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   // ✏️ Save edit
//   const handleSaveEdit = async () => {
//     if (!editedMessage.trim()) return;

//     try {
//       setIsSaving(true);
//       const res = await axios.put(
//         `${BASE_URL}/api/v1/message/edit/${message._id}`,
//         { newMessage: editedMessage },
//         { withCredentials: true }
//       );

//       message.message = res.data.msg.message;
//       message.editedAt = res.data.msg.editedAt;
//       setIsEditing(false);
//     } catch (err) {
//       console.log(err);
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   // 😀 React
//   const handleReaction = async (emoji) => {
//     try {
//       const res = await axios.post(
//         `${BASE_URL}/api/v1/message/react/${message._id}`,
//         { emoji },
//         { withCredentials: true }
//       );

//       dispatch(
//         updateMessageReaction({
//           messageId: message._id,
//           reactions: res.data.reactions,
//         })
//       );
//       setShowReactions(false);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <>
//       {/* MESSAGE ROW */}
//       <div
//         ref={scroll}
//         className={`flex w-full mb-3 px-2 ${
//           isSender ? "justify-end" : "justify-start"
//         }`}
//       >
//         {!isSender && (
//           <img
//             src={selectedUser?.profilePhoto}
//             alt="avatar"
//             className="w-8 h-8 rounded-full mr-2 self-end"
//           />
//         )}

//         {/* WRAPPER (important) */}
//         <div className="relative max-w-[70%]">
//           {/* BUBBLE */}
//           <div
//             onContextMenu={(e) => {
//               e.preventDefault();
//               setShowDelete(true);
//             }}
//             className={`relative px-3 py-2 text-sm rounded-lg
//               break-words overflow-wrap-anywhere whitespace-pre-wrap
//               ${
//                 isSender
//                   ? "bg-green-600 text-white rounded-br-none"
//                   : "bg-gray-700 text-white rounded-bl-none"
//               }
//             `}
//           >
//             {/* TEXT / EDIT */}
//             {isEditing ? (
//               <textarea
//                 value={editedMessage}
//                 onChange={(e) => setEditedMessage(e.target.value)}
//                 className="w-full bg-transparent border border-gray-500 rounded p-1 text-sm resize-none"
//                 rows={2}
//                 autoFocus
//               />
//             ) : (
//               <p className="pr-10">{message?.message}</p>
//             )}

//             {/* EDIT BUTTON */}
//             {canEdit && !isEditing && (
//               <button
//                 className="absolute top-1 right-1 text-xs text-gray-300"
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   setIsEditing(true);
//                 }}
//               >
//                 Edit
//               </button>
//             )}

//             {/* EDIT ACTIONS */}
//             {isEditing && (
//               <div className="absolute top-1 right-1 flex gap-2">
//                 <button
//                   className="text-xs text-green-400"
//                   onClick={handleSaveEdit}
//                   disabled={isSaving}
//                 >
//                   {isSaving ? "Saving..." : "Save"}
//                 </button>
//                 <button
//                   className="text-xs text-red-400"
//                   onClick={() => {
//                     setIsEditing(false);
//                     setEditedMessage(message?.message || "");
//                   }}
//                 >
//                   Cancel
//                 </button>
//               </div>
//             )}

//             {/* TIME */}
//             <span className="absolute bottom-1 right-2 text-[10px] opacity-70">
//               {message?.editedAt && "(edited) "}
//               {new Date(message?.createdAt).toLocaleTimeString("en-IN", {
//                 hour: "2-digit",
//                 minute: "2-digit",
//                 hour12: true,
//               })}
//             </span>
//           </div>

//           {/* REACTIONS */}
//           {Array.isArray(message?.reactions) &&
//             message.reactions.length > 0 && (
//               <div
//                 className={`absolute -bottom-3 ${
//                   isSender ? "right-2" : "left-2"
//                 } bg-[#1f2c33] text-white rounded-full px-2 py-[2px]
//                 flex gap-1 text-[11px] shadow-md`}
//               >
//                 {Object.entries(
//                   message.reactions.reduce((acc, r) => {
//                     acc[r.emoji] = (acc[r.emoji] || 0) + 1;
//                     return acc;
//                   }, {})
//                 ).map(([emoji, count]) => (
//                   <span key={emoji}>
//                     {emoji}
//                     {count > 1 && (
//                       <span className="opacity-70 ml-[2px]">{count}</span>
//                     )}
//                   </span>
//                 ))}
//               </div>
//             )}

//           {/* REACTION BUTTON */}
//           <span
//             className={`absolute top-1/2 -translate-y-1/2 ${
//               isSender ? "-left-6" : "-right-6"
//             } bg-gray-800 text-xs rounded-full p-1
//             opacity-0 hover:opacity-100 cursor-pointer transition`}
//             onClick={() => setShowReactions((p) => !p)}
//           >
//             😊
//           </span>

//           {/* EMOJI PICKER */}
//           {showReactions && (
//             <div
//               className={`absolute -top-10 ${
//                 isSender ? "-left-2" : "-right-2"
//               } bg-gray-800 rounded-full px-2 py-1 flex gap-2`}
//             >
//               {emojis.map((e) => (
//                 <span
//                   key={e}
//                   className="cursor-pointer text-lg"
//                   onClick={() => handleReaction(e)}
//                 >
//                   {e}
//                 </span>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* DELETE MODAL */}
//       {showDelete && (
//         <div
//           className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
//           onClick={() => setShowDelete(false)}
//         >
//           <div
//             className="bg-gray-800 text-white rounded-lg w-64 p-4"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <p className="text-sm mb-4">Delete message?</p>
//             <div className="flex justify-end gap-4 text-sm">
//               <button
//                 className="text-gray-400"
//                 onClick={() => setShowDelete(false)}
//               >
//                 Cancel
//               </button>
//               <button
//                 className="text-red-400"
//                 onClick={() => {
//                   handleDelete();
//                   setShowDelete(false);
//                 }}
//               >
//                 Delete for me
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Message;






















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

  const isSender =
    message?.senderId?.toString() === authUser?._id?.toString();

  // ⏳ 5-minute edit rule
  const EDIT_TIME = 5 * 60 * 1000;
  const canEdit =
    isSender &&
    Date.now() - new Date(message?.createdAt).getTime() < EDIT_TIME;

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  // 🗑️ Delete
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

  // ✏️ Save edit
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

        {/* BUBBLE WRAPPER */}
        <div className="max-w-[65%] relative">
          <div
            onContextMenu={(e) => {
              e.preventDefault();
              setShowDelete(true);
            }}
            className={`relative px-3 py-2 text-sm rounded-lg
              break-words overflow-wrap-anywhere whitespace-pre-wrap
              ${
                isSender
                  ? "bg-green-600 text-white rounded-br-none"
                  : "bg-gray-700 text-white rounded-bl-none"
              }
            `}
          >
            {/* TEXT / EDIT */}
            {isEditing ? (
              <textarea
                value={editedMessage}
                onChange={(e) => setEditedMessage(e.target.value)}
                className="w-full bg-transparent border border-gray-500 rounded p-1 text-sm resize-none"
                rows={2}
                autoFocus
              />
            ) : (
              <p className="pr-10">{message?.message}</p>
            )}

            {/* EDIT BUTTON */}
            {canEdit && !isEditing && (
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

            {/* TIME */}
            <span className="absolute bottom-1 right-2 text-[10px] opacity-70">
              {message?.editedAt && "(edited) "}
              {new Date(message?.createdAt).toLocaleTimeString("en-IN", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            </span>
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
    </>
  );
};

export default Message;
