import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "..";

import MyStatus from "./status/MyStatus";
import StatusList from "./status/StatusList";

const Status = () => {
  const [statuses, setStatuses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStatuses = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/api/v1/status`,
        { withCredentials: true }
      );

      setStatuses(res.data);
    } catch (err) {
      console.error("Fetch status error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatuses();
  }, []);

  return (
    <div className="h-full w-full bg-black text-white p-4 overflow-y-auto">
      <MyStatus onStatusAdded={fetchStatuses} />

      {loading ? (
        <p className="text-center text-gray-400 mt-4">Loading statuses...</p>
      ) : (
        <StatusList statuses={statuses} />
      )}
    </div>
  );
};

export default Status;
