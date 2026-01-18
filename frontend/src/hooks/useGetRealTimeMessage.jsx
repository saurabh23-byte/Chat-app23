// import { useEffect } from "react";
// import {useSelector, useDispatch} from "react-redux";
// import { setMessages } from "../redux/messageSlice";

// const useGetRealTimeMessage = () => {
//     const {socket} = useSelector(store=>store.socket);
//     const {messages} = useSelector(store=>store.message);
//     const dispatch = useDispatch();
//     useEffect(()=>{
//         socket?.on("newMessage", (newMessage)=>{
//             dispatch(setMessages([...messages, newMessage]));
//         });
//         return () => socket?.off("newMessage");
//     },[setMessages, messages]);
// };
// export default useGetRealTimeMessage;









import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setMessages, updateMessageReaction } from "../redux/messageSlice";

const useGetRealTimeMessage = () => {
  const { socket } = useSelector((store) => store.socket);
  const { messages } = useSelector((store) => store.message);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!socket) return;

    // 📩 New message listener
    socket.on("newMessage", (newMessage) => {
      dispatch(setMessages([...messages, newMessage]));
    });

    // 😀 Message reaction listener
    socket.on("messageReaction", ({ messageId, reactions }) => {
      dispatch(
        updateMessageReaction({
          messageId,
          reactions,
        })
      );
    });

    return () => {
      socket.off("newMessage");
      socket.off("messageReaction");
    };
  }, [socket, messages, dispatch]);
};

export default useGetRealTimeMessage;
