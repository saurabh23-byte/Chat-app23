import { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../..";


const StatusViewer = ({ status, onClose }) => {
  useEffect(() => {
    axios.post(
      `/api/v1/status/view/${status._id}`,
      {},
      { withCredentials: true }
    );
  }, [status._id]);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black flex items-center justify-center text-white text-xl z-50"
    >
      {status.text}
    </div>
  );
};

export default StatusViewer;
