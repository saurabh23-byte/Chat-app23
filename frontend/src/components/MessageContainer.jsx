// import React from "react";
// import SendInput from "./SendInput";
// import Messages from "./Messages";
// import { useSelector } from "react-redux";
// import { smartReplySuggestions } from "../utils/smartReplies";

// const MessageContainer = () => {
//   const { selectedUser, authUser, onlineUsers } = useSelector(
//     (store) => store.user
//   );

//   const isOnline = onlineUsers?.includes(selectedUser?._id);


//   return (
//     <div className="h-full w-full flex flex-col min-h-0 bg-black">
//       {selectedUser ? (
//         <>
//           {/* 🔝 HEADER (fixed) */}
//           <div className="shrink-0 flex gap-2 items-center bg-zinc-800 text-white px-4 py-2">
//             <div className={`avatar ${isOnline ? "online" : ""}`}>
//               <div className="w-12 rounded-full">
//                 <img
//                   src={selectedUser?.profilePhoto}
//                   alt="user-profile"
//                 />
//               </div>
//             </div>

//             <p className="font-medium">{selectedUser?.fullName}</p>
//           </div>

//           {/* 🟡 MESSAGES (ONLY THIS SCROLLS) */}
//           <div className="flex-1 min-h-0 overflow-y-auto px-4 py-2">
//             <Messages />
//           </div>

//           {/* 🔻 INPUT (fixed) */}
//           <div className="shrink-0">
//             <SendInput />
//           </div>
//         </>
//       ) : (
//         <div className="flex-1 flex flex-col justify-center items-center">
//           <h1 className="text-4xl text-white font-bold">
//             Hi, {authUser?.fullName}
//           </h1>
//           <h2 className="text-2xl text-white mt-2">
//             Let&apos;s start a conversation
//           </h2>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MessageContainer;





import React, { useEffect, useRef, useState } from "react";
import SendInput from "./SendInput";
import Messages from "./Messages";
import { useSelector } from "react-redux";
import { smartReplyRules } from "../utils/smartReplies";

const MessageContainer = () => {
  const { selectedUser, authUser, onlineUsers } = useSelector(
    (store) => store.user
  );
  const { messages } = useSelector((store) => store.message);

  const isOnline = onlineUsers?.includes(selectedUser?._id);

  const [smartReplies, setSmartReplies] = useState([]);
  const smartReplyRef = useRef(null);

  // 🔍 match smart replies
  const getSmartReplies = (text) => {
    if (!text) return [];
    const lower = text.toLowerCase();

    for (let rule of smartReplyRules) {
      for (let key of rule.keywords) {
        if (lower.includes(key)) {
          return rule.replies;
        }
      }
    }
    return [];
  };

  // 👂 listen for incoming messages
  useEffect(() => {
    if (!messages || messages.length === 0) return;

    const lastMessage = messages[messages.length - 1];

    // only for incoming messages
    if (lastMessage.senderId !== authUser?._id) {
      const replies = getSmartReplies(lastMessage.message);
      setSmartReplies(replies);
    } else {
      setSmartReplies([]);
    }
  }, [messages, authUser]);

  return (
    <div className="h-full w-full flex flex-col min-h-0 bg-black">
      {selectedUser ? (
        <>
          {/* 🔝 HEADER */}
          <div className="shrink-0 flex gap-2 items-center bg-zinc-800 text-white px-4 py-2">
            <div className={`avatar ${isOnline ? "online" : ""}`}>
              <div className="w-12 rounded-full">
                <img
                  src={selectedUser?.profilePhoto}
                  alt="user-profile"
                />
              </div>
            </div>
            <p className="font-medium">{selectedUser?.fullName}</p>
          </div>

          {/* 🟡 MESSAGES */}
          <div className="flex-1 min-h-0 overflow-y-auto px-4 py-2">
            <Messages />
          </div>

          {/* 💡 SMART REPLIES */}
          {smartReplies.length > 0 && (
            <div className="shrink-0 flex gap-2 px-4 py-2 bg-zinc-900 border-t border-zinc-700">
              {smartReplies.map((reply, index) => (
                <button
                  key={index}
                  className="px-3 py-1 text-sm rounded-full bg-zinc-700 text-white hover:bg-zinc-600 transition"
                  onClick={() => {
                    smartReplyRef.current(reply);
                    setSmartReplies([]);
                  }}
                >
                  {reply}
                </button>
              ))}
            </div>
          )}

          {/* 🔻 INPUT */}
          <div className="shrink-0">
            <SendInput onSmartReply={smartReplyRef} />
          </div>
        </>
      ) : (
        <div className="flex-1 flex flex-col justify-center items-center">
          <h1 className="text-4xl text-white font-bold">
            Hi, {authUser?.fullName}
          </h1>
          <h2 className="text-2xl text-white mt-2">
            Let&apos;s start a conversation
          </h2>
        </div>
      )}
    </div>
  );
};

export default MessageContainer;
