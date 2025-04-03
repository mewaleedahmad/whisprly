import { createContext, useEffect, useState, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import { io } from "socket.io-client";
import useGlobalState from "../zustand/useGlobalState";
import {API_URL} from "../constants"

const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { authUser } = useAuthContext();
  const {setLastMessage, setMessages} = useGlobalState()
  
  useEffect(() => {
    if (authUser) {
      const socket = io(API_URL, {
        query: {
          userId: authUser._id,
        },
        withCredentials: true
      });
      setSocket(socket);

      socket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });
      
      socket.on("newMessage", ({newMessage}) => {
        if (newMessage) {
          setMessages(prevMessages => {
            if (!Array.isArray(prevMessages)) return [newMessage];
            
            // Check if we have a temporary version of this message
            const tempMessageIndex = prevMessages.findIndex(
              msg => msg.isOptimistic && 
                    msg.senderId === newMessage.senderId && 
                    msg.receiverId === newMessage.receiverId &&
                    ((msg.message && msg.message === newMessage.message) || 
                     (msg.image && newMessage.image)) // Match by image presence too
            );
            
            if (tempMessageIndex !== -1) {
              const updatedMessages = [...prevMessages];
              
              const tempId = updatedMessages[tempMessageIndex]._id;
              
              updatedMessages[tempMessageIndex] = {
                ...newMessage,
                _id: tempId,           
                tempId: newMessage._id,   
                isOptimistic: false,        
                originalImage: updatedMessages[tempMessageIndex].image 
              };
              
              return updatedMessages;
            } else {
              // If no temporary message found, just add the new one
              return [...prevMessages, newMessage];
            }
          });
        }
      });
      
      socket.on("getLastMessage", (message) => {
        setLastMessage(message);
      });

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
        socket.off("getOnlineUsers");
        socket.off("newMessage");
        socket.off("getLastMessage");
        socket.off("messagesSeen");
        socket.close();
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
