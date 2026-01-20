
// // export default SendInput;

// import axios from "axios";
// import { useRef, useState, useEffect } from "react";
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

//   // 🔑 Draft key per chat
//   const draftKey = selectedUser ? `draft_${selectedUser._id}` : null;


//   // 🔁 Load draft when user/chat changes
//   useEffect(() => {
//     if (!draftKey) return;

//     const savedDraft = localStorage.getItem(draftKey);
//     if (savedDraft) {
//       setMessage(savedDraft);

//       // restore textarea height
//       setTimeout(() => {
//         if (textareaRef.current) {
//           textareaRef.current.style.height = "auto";
//           textareaRef.current.style.height =
//             textareaRef.current.scrollHeight + "px";
//         }
//       }, 0);
//     } 
//   }, [draftKey]);

//   // 💾 Save draft on typing
//   useEffect(() => {
//     if (!draftKey) return;

//     if (message.trim()) {
//       localStorage.setItem(draftKey, message);
//     } else {
//       localStorage.removeItem(draftKey);
//     }
//   }, [message, draftKey]);

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
//       return;
//     }

//     // 🧹 clear message + draft
//     setMessage("");
//     if (draftKey) localStorage.removeItem(draftKey);

//     textareaRef.current.style.height = "auto";
//   };

//   // 🔥 expose sendMessage for smart replies (unchanged)
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

//           <button
//             onClick={sendMessage}
//             className="hover:text-green-400 
//             text-green-500 shrink-0 rounded-full"
//           >
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
import { FiPaperclip } from "react-icons/fi";

const SendInput = ({ onSmartReply }) => {
  const [message, setMessage] = useState("");
  const textareaRef = useRef(null);
  const [file, setFile] = useState(null);

  const dispatch = useDispatch();
  const { selectedUser } = useSelector((store) => store.user);
  const { messages } = useSelector((store) => store.message);

  const draftKey = selectedUser ? `draft_${selectedUser._id}` : null;

  useEffect(() => {
    if (!draftKey) return;

    const savedDraft = localStorage.getItem(draftKey);
    if (savedDraft) {
      setMessage(savedDraft);

      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.style.height = "auto";
          textareaRef.current.style.height =
            textareaRef.current.scrollHeight + "px";
        }
      }, 0);
    }
  }, [draftKey]);

  useEffect(() => {
    if (!draftKey) return;

    if (message.trim()) {
      localStorage.setItem(draftKey, message);
    } else {
      localStorage.removeItem(draftKey);
    }
  }, [message, draftKey]);

  // ================= SEND MESSAGE =================
  const sendMessage = async () => {
    // allow message OR file OR both
    if (!message.trim() && !file) { return; }

    try {
      // ⭐ ADDED: FormData for file upload
      const formData = new FormData();
      formData.append("message", message); // ⭐ ADDED
      if (file) {
        formData.append("file", file); // ⭐ ADDED
      }

      const res = await axios.post(
        `${BASE_URL}/api/v1/message/send/${selectedUser._id}`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      dispatch(setMessages([...messages, res.data.newMessage]));
    } catch (err) {
      console.log(err);
      return;
    }

    // 🧹 clear message + file + draft
    setMessage("");
    setFile(null);
    if (draftKey) localStorage.removeItem(draftKey);

    textareaRef.current.style.height = "auto";
  };

  // 🔥 expose sendMessage for smart replies
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

          {/* ⭐ ADDED: hidden file input */}
          <input
            type="file"
            id="fileInput"
            hidden
            onChange={(e) => setFile(e.target.files[0])} // ⭐ ADDED
          />

          {/* ⭐ ADDED: attach button */}
          <label
            htmlFor="fileInput"
            className="cursor-pointer text-gray-400 hover:text-white"
          >
            <FiPaperclip size={18} />
          </label>

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

        {/* ⭐ ADDED: selected file preview (name only) */}
        {file && (
          <div className="text-xs text-gray-400 mt-1">
            Attached: {file.name}
          </div>
        )}
      </div>
    </div>
  );
};

export default SendInput;
