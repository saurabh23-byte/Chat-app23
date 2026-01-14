import axios from "axios";
import { useRef, useState } from "react";
import { IoSend } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from '..';
import { setMessages } from "../redux/messageSlice";

const SendInput = () => {
  const [message, setMessage] = useState("");
  const textareaRef = useRef(null);

  const dispatch = useDispatch();
  const { selectedUser } = useSelector((store) => store.user);
  const { messages } = useSelector((store) => store.message);

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
    }

    setMessage("");
    textareaRef.current.style.height = "auto";
  };

  const handleChange = (e) => {
    setMessage(e.target.value);

    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height =
      textareaRef.current.scrollHeight + "px";
  };

  const handleKeyDown = (e) => {
    // ENTER → SEND
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
    // SHIFT + ENTER → NEW LINE (default)
  };

  return (
  <div className="px-4 py-3 border-t border-slate-700 bg-black">
    <div className="mx-auto max-w-4xl">
      <div className="flex items-end gap-2 bg-zinc-800 rounded-lg px-3 py-2">

        {/* TEXTAREA */}
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

        {/* SEND BUTTON */}
        <button
          onClick={sendMessage}
          className="text-green-500 hover:text-green-400 shrink-0"
        >
          <IoSend size={22} />
        </button>

      </div>
    </div>
  </div>
);

};

export default SendInput;
