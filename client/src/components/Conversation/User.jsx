import { BsThreeDotsVertical } from "react-icons/bs";
import { LuUserMinus2 } from "react-icons/lu";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import useGlobalState from "../../zustand/useGlobalState";
import useRemoveFriend from "../../hooks/useRemoveFriend";
import { useSocketContext } from "../../context/SocketContext";


const User = () => {
  const {setSelectedConversation,selectedConversation} = useGlobalState();
  const {removeFriend} = useRemoveFriend()
  const {onlineUsers} = useSocketContext()
  const isActive = onlineUsers.includes(selectedConversation._id)

  const handleRemoveFriend = async (id) => {
    await removeFriend(id)
  }
  
  return (
    <div className="w-full flex items-center justify-between p-5  border-b borderColor">
      <div onClick={()=>setSelectedConversation(null)} className="absolute left-4 font-bold lg:hidden "><MdOutlineKeyboardBackspace className="text-3xl text-white"/></div>
     <div  className="flex ps-10 lg:ps-0 gap-3">
      <div className={`avatar ${isActive ? "online": "offline"}`}>
        <div className="w-12 rounded-full">
          <img src={selectedConversation.profilePic} />
        </div>
      </div>
      <div className="name -space-y-1">
        <h2>{selectedConversation.fullName}</h2>
        <h5 className="ps-1 ">{selectedConversation.userName}</h5>
      </div>
      </div>
     <div className="dropdown dropdown-bottom  dropdown-end">
       <div tabIndex={0} role="button" className="btn text-xl bg-transparent border-none "><BsThreeDotsVertical/></div>
        <ul tabIndex={0} className="dropdown-content menu bg-secondary rounded-box z-[1] w-52 p-2 shadow">
         <li><button onClick={()=>handleRemoveFriend(selectedConversation._id)} className="text-red-500 text-sm"><p>Remove Friend</p><LuUserMinus2/></button></li>
        </ul>
     </div>
    </div>
  );
};

export default User;
