import { createContext, useEffect, useState, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import { io } from "socket.io-client";
import useGlobalState from "../zustand/useGlobalState";

const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};
export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { authUser } = useAuthContext();
  const {setFriends,setLastMessage,setMessages} = useGlobalState()

  useEffect(() => {
    if (authUser) {
      const socket = io("http://localhost:8000", {
        query: {
          userId: authUser._id,
        },
      });
      setSocket(socket);

      socket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });
      
      socket.on("getFriends",(friends)=>{
        setFriends(friends)
      })

      socket.on("newMessage", ({newMessage}) => {
        if (newMessage) {
          setMessages(prevMessages => 
            Array.isArray(prevMessages) ? [...prevMessages, newMessage] : [newMessage]
          );
        }
      });

      socket.on("getLastMessage",(message)=>{
        setLastMessage(message)
      })
      
      return () => {
        socket.off("getOnlineUsers")
        socket.off("getFriends")
        socket.off("getLastMessage")
        socket.close()
      }
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
