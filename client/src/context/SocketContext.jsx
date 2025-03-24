import { createContext, useEffect, useState, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import { io } from "socket.io-client";
import useGlobalState from "../zustand/useGlobalState";
import {API_URL} from "../config"


const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};
export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { authUser } = useAuthContext();
  const {setLastMessage,setMessages} = useGlobalState()
  

  useEffect(() => {
    if (authUser) {
      const socket = io(API_URL, {
        query: {
          userId: authUser._id,
        },
        withCredentials:true
      });
      setSocket(socket);

      socket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });
      
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

      socket.on("messagesSeen", (userId) => {
        setMessages(prevMessages => 
          prevMessages.map(msg => {
            if (msg?.senderId === authUser._id && msg?.receiverId === userId) {
              return { ...msg, seen: true };
            }
            else if (msg?.receiverId === authUser._id && msg?.senderId === userId) {
              return { ...msg, seen: true };
            }
            return msg;
          })
        );
      });
      
      return () => {
        socket.off("getOnlineUsers")
        socket.off("newMessage")
        socket.off("getLastMessage")
        socket.off("messagesSeen")
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
