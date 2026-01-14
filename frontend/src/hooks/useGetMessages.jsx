
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from '..';
import { setMessages } from "../redux/messageSlice";


const useGetMessages = () => {

  const dispatch = useDispatch();
  const { selectedUser } = useSelector((store) => store.user);

  useEffect(() => {
    if (!selectedUser?._id) return;

    const fetchMessages = async () => {
      const res = await axios.get(`${BASE_URL}/api/v1/message/${selectedUser._id}`,
        { withCredentials: true });

      dispatch(setMessages(res.data));

    };
    fetchMessages();
  }, [selectedUser?._id, dispatch]);
};


export default useGetMessages;


