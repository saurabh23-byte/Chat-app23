import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { BiSearchAlt2 } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "..";
import { setMessages } from "../redux/messageSlice";
import {
  setAuthUser,
  setOtherUsers,
  setSelectedUser,
} from "../redux/userSlice";
import OtherUsers from "./OtherUsers";

const Sidebar = () => {
  const [search, setSearch] = useState("");
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const { otherUsers } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /* ================= LOGOUT ================= */
  const confirmLogoutHandler = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/api/v1/user/logout`,
        { withCredentials: true }
      );

      toast.success(res.data.message);

      dispatch(setAuthUser(null));
      dispatch(setMessages([]));
      dispatch(setOtherUsers(null));
      dispatch(setSelectedUser(null));

      navigate("/login");
    } catch (err) {
      console.error(err);
      toast.error("Logout failed");
    }
  };

  /* ================= SEARCH ================= */
  const searchSubmitHandler = (e) => {
    e.preventDefault();

    if (!search.trim()) return;

    const user = otherUsers?.find((u) =>
      u.fullName.toLowerCase().includes(search.toLowerCase())
    );

    if (user) {
      dispatch(setOtherUsers([user]));
    } else {
      toast.error("User not found");
    }
  };

  return (
    <div className="h-full w-full flex flex-col bg-black border-r border-slate-700">

      {/* SEARCH */}
      <div className="p-4 shrink-0">
        <form onSubmit={searchSubmitHandler} className="flex gap-2">
          <input
            className="input input-bordered w-full min-w-0"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="btn bg-zinc-800 text-white shrink-0">
            <BiSearchAlt2 />
          </button>
        </form>
      </div>

      {/* USERS */}
      <div className="flex-1 overflow-y-auto px-2">
        <OtherUsers />
      </div>

      {/* STATUS (SAFE) */}
      <div className="px-4 pb-2 shrink-0">
        <button
          onClick={() => toast("Status feature coming soon 🚀")}
          className="btn btn-sm w-full bg-zinc-800 hover:bg-green-600 text-white"
        >
          Status
        </button>
      </div>

      {/* LOGOUT */}
      <div className="p-4 border-t border-slate-700 shrink-0">
        <button
          onClick={() => setShowLogoutModal(true)}
          className="btn btn-sm w-full bg-zinc-800 hover:bg-red-600 text-white"
        >
          Logout
        </button>
      </div>

      {/* LOGOUT MODAL */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4">Confirm Logout?</h3>
            <p className="mb-4">Are you sure you want to logout?</p>

            <div className="py-4 flex justify-end gap-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-3 py-1 rounded-md bg-green-200 text-green-700 font-semibold"
              >
                Cancel
              </button>

              <button
                onClick={confirmLogoutHandler}
                className="px-3 py-1 rounded-md bg-red-200 text-red-800 font-semibold"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
