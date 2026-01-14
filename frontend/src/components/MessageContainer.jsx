import React from "react";
import SendInput from "./SendInput";
import Messages from "./Messages";
import { useSelector } from "react-redux";

const MessageContainer = () => {
  const { selectedUser, authUser, onlineUsers } = useSelector(
    (store) => store.user
  );

  const isOnline = onlineUsers?.includes(selectedUser?._id);

  return (
    <div className="h-full w-full flex flex-col min-h-0 bg-black">
      {selectedUser ? (
        <>
          {/* 🔝 HEADER (fixed) */}
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

          {/* 🟡 MESSAGES (ONLY THIS SCROLLS) */}
          <div className="flex-1 min-h-0 overflow-y-auto px-4 py-2">
            <Messages />
          </div>

          {/* 🔻 INPUT (fixed) */}
          <div className="shrink-0">
            <SendInput />
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
