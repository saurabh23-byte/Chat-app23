

// // important use this if code crash

// import axios from "axios";
// import { useRef, useState } from "react";
// import { IoSend } from "react-icons/io5";
// import { useDispatch, useSelector } from "react-redux";
// import { BASE_URL } from "..";
// import { setMessages } from "../redux/messageSlice";

// const SendInput = ({ onSmartReply }) => {
//   const [message, setMessage] = useState("");
//   const textareaRef = useRef(null);

//   const dispatch = useDispatch();
//   const { selectedUser } = useSelector((store) => store.user);
//   const { messages } = useSelector((store) => store.message);

//   const sendMessage = async () => {
//     if (!message.trim()) return;

//     try {
//       const res = await axios.post(
//         `${BASE_URL}/api/v1/message/send/${selectedUser._id}`,
//         { message },
//         { withCredentials: true }
//       );

//       dispatch(setMessages([...messages, res.data.newMessage]));
//     } catch (err) {
//       console.log(err);
//     }

//     setMessage("");
//     textareaRef.current.style.height = "auto";
//   };

//   // 🔥 expose sendMessage for smart replies
//   if (onSmartReply) {
//     onSmartReply.current = (text) => {
//       setMessage(text);
//       setTimeout(() => sendMessage(), 0);
//     };
//   }

//   const handleChange = (e) => {
//     setMessage(e.target.value);
//     textareaRef.current.style.height = "auto";
//     textareaRef.current.style.height =
//       textareaRef.current.scrollHeight + "px";
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       sendMessage();
//     }
//   };

//   return (
//     <div className="px-4 py-3 border-t border-slate-700 bg-black">
//       <div className="mx-auto max-w-4xl">
//         <div className="flex items-end gap-2 bg-zinc-800 rounded-lg px-3 py-2">
//           <textarea
//             ref={textareaRef}
//             value={message}
//             onChange={handleChange}
//             onKeyDown={handleKeyDown}
//             rows={1}
//             placeholder="Type a message"
//             className="
//               w-full resize-none bg-transparent text-white
//               outline-none
//               overflow-y-auto overflow-x-hidden
//               whitespace-pre-wrap break-words
//               leading-5
//             "
//             style={{
//               maxHeight: "160px",
//               whiteSpace: "pre-wrap",
//               wordBreak: "break-word",
//             }}
//           />

//           <button onClick={sendMessage} className="hover:text-green-400 
//           text-green-500 shrink-0
//           rounded-full
//           ">
//             <IoSend size={20} />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };




// export default SendInput;

import axios from "axios";
import { useRef, useState, useEffect } from "react";
import { IoSend } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "..";
import { setMessages } from "../redux/messageSlice";

const SendInput = ({ onSmartReply }) => {
  const [message, setMessage] = useState("");
  const textareaRef = useRef(null);

  const dispatch = useDispatch();
  const { selectedUser } = useSelector((store) => store.user);
  const { messages } = useSelector((store) => store.message);

  // 🔑 Draft key per chat
  const draftKey = selectedUser ? `draft_${selectedUser._id}` : null;


  // 🔁 Load draft when user/chat changes
  useEffect(() => {
    if (!draftKey) return;

    const savedDraft = localStorage.getItem(draftKey);
    if (savedDraft) {
      setMessage(savedDraft);

      // restore textarea height
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.style.height = "auto";
          textareaRef.current.style.height =
            textareaRef.current.scrollHeight + "px";
        }
      }, 0);
    } 
  }, [draftKey]);

  // 💾 Save draft on typing
  useEffect(() => {
    if (!draftKey) return;

    if (message.trim()) {
      localStorage.setItem(draftKey, message);
    } else {
      localStorage.removeItem(draftKey);
    }
  }, [message, draftKey]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    try {
      const res = await axios.post(
        `${BASE_URL}/api/v1/message/send/${selectedUser._id}`,
        { message },
        { withCredentials: true }
      );

      dispatch(setMessages([...messages, res.data.newMessage]));
    } catch (err) {
      console.log(err);
      return;
    }

    // 🧹 clear message + draft
    setMessage("");
    if (draftKey) localStorage.removeItem(draftKey);

    textareaRef.current.style.height = "auto";
  };

  // 🔥 expose sendMessage for smart replies (unchanged)
  if (onSmartReply) {
    onSmartReply.current = (text) => {
      setMessage(text);
      setTimeout(() => sendMessage(), 0);
    };
  }

  const handleChange = (e) => {
    setMessage(e.target.value);

    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height =
      textareaRef.current.scrollHeight + "px";
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="px-4 py-3 border-t border-slate-700 bg-black">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-end gap-2 bg-zinc-800 rounded-lg px-3 py-2">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            rows={1}
            placeholder="Type a message"
            className="
              w-full resize-none bg-transparent text-white
              outline-none
              overflow-y-auto overflow-x-hidden
              whitespace-pre-wrap break-words
              leading-5
            "
            style={{
              maxHeight: "160px",
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
            }}
          />

          <button
            onClick={sendMessage}
            className="hover:text-green-400 
            text-green-500 shrink-0 rounded-full"
          >
            <IoSend size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SendInput;
