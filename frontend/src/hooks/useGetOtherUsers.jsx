import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BASE_URL } from '..';
import { setOtherUsers } from "../redux/userSlice";

// This hook automatically fetches all chat users from the server once and stores them in Redux so the app can display them anywhere.
const useGetOtherUsers = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchOtherUsers = async () => {
      try {
        axios.defaults.withCredentials = true;  //If you do NOT use withCredentials = true, 
                                                 // the cookie will NOT be sent to the backend.
        const res = await axios.get(`${BASE_URL}/api/v1/user`);
        // store in redux
        console.log("other users -> ", res.data);
        const usersData = res.data?.users || res.data;
        dispatch(setOtherUsers(usersData));
      } catch (error) {
        console.log(error);
      }
    };
    fetchOtherUsers();
  }, [dispatch]);  //Yes, this code runs only ONE TIME when the page/component loads (or reloads).
};

export default useGetOtherUsers;
