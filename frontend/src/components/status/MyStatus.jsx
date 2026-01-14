import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../..";



const MyStatus = ({ onStatusAdded }) => {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");

  const addStatus = async () => {
    if (!text.trim()) return;

    try {
      await axios.post(
        "/api/v1/status",
        { type: "text", text },
        { withCredentials: true }
      );

      setText("");
      setOpen(false);
      onStatusAdded();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className="flex items-center gap-3 mb-4 cursor-pointer"
      >
        <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-xl">
          +
        </div>
        <p className="font-medium">My Status</p>
      </div>

      {open && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-zinc-900 p-4 rounded w-80">
            <textarea
              className="w-full bg-black p-2 rounded text-white"
              placeholder="Type status..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />

            <div className="flex justify-end gap-3 mt-3">
              <button
                onClick={() => setOpen(false)}
                className="text-green-500"
              >
                Cancel
              </button>
              <button
                onClick={addStatus}
                className="bg-green-500 text-black px-4 py-1 rounded"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MyStatus;
