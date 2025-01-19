import { useEffect, useState } from "react";
import useGetFriends from "../../hooks/useGetFriends";
import useGlobalState from "../../zustand/useGlobalState";
import useGetMessages from "../../hooks/useGetMessages";
import { useSocketContext } from "../../context/SocketContext";

const Friends = () => {
  const [loading, setLoading] = useState(false);
  const { setSelectedConversation,selectedConversation, setMessages, setLoadingState, setFriends, friends } = useGlobalState();
  const { getFriends } = useGetFriends();
  const { getMessages } = useGetMessages();
  const { onlineUsers } = useSocketContext();

  const truncateName = (name, maxLength) => {
    return name.length > maxLength ? `${name.slice(0, maxLength)}...` : name;
  };

  useEffect(() => {
    const handleFriends = async () => {
      const data = await getFriends();
      setFriends(data);
      setLoading(true);
    };
    handleFriends();
  }, []);
  const handleGetMessages = async (id) => {
    setLoadingState(true);
    const data = await getMessages(id);
    setMessages(data);
    setLoadingState(false);
  };

  useEffect(() => {
    return () => {
      setSelectedConversation(null);
      setMessages([]);
      setLoadingState(false);
    };
  }, [setLoadingState, setMessages, setSelectedConversation]);

  return (
    <div className="w-full px-5">
      <h2 className="px-1">All Friends</h2>
      <div className="flex gap-5 pt-4 pb-3 overflow-x-auto scrollable-div items-center">
        {!loading ? (
          <div>
            <div className="flex flex-col items-center gap-2">
              <div className="skeleton h-14 w-14 shrink-0 rounded-full bg-secondary"></div>
              <div className="skeleton h-3 w-14 bg-secondary"></div>
            </div>
          </div>
        ) : (
          <>
            {((!friends.message) || (!friends.length === 0)) ? (
              friends.map((user) => {
                const isActive = onlineUsers.includes(user._id); 
                return (
                  <div onClick={() => {setSelectedConversation(user);handleGetMessages(user._id);}} key={user._id}  className="Friend cursor-pointer">
                    <div className={`avatar  ${isActive ? "online" : "offline"}`}>
                      <div className="w-14 bg-quaternary rounded-full">
                        <img src={user.profilePic} alt={`${user.fullName}'s avatar`} />
                      </div>
                    </div>
                    <h5 className="text-center text-nowrap max-w-14">{truncateName(user.fullName, 9)}</h5>
                  </div>
                );
              })
            ) : (
              <h5 className="text-base text-gray-400 ps-2 py-6">No friends found. Add someone!</h5>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Friends;
