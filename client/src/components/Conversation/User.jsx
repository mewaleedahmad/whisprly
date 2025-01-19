import { BsThreeDotsVertical } from "react-icons/bs";
import { LuUserMinus2 } from "react-icons/lu";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import useGlobalState from "../../zustand/useGlobalState";
import useRemoveFriend from "../../hooks/useRemoveFriend";
import { useSocketContext } from "../../context/SocketContext";


const User = () => {
  const {setSelectedConversation,selectedConversation,setRemoveFriend,setRemoveConversation} = useGlobalState();
  const {removeFriend} = useRemoveFriend()
  const {onlineUsers} = useSocketContext()
  const isActive = onlineUsers.includes(selectedConversation._id)


  const handleRemoveFriend = async (id) => {
   try{
    await removeFriend(id)
    setRemoveFriend(id)
    setRemoveConversation(id)
    setSelectedConversation(null)
   }catch(error){
    console.log("Error Removing friend",error)
   }
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
      <dialog id="removeFriend" className="modal ">
        <div className="modal-box py-6 absolute top-24 lg:relative lg:top-0  bg-primary w-full lg:w-[450px] lg:max-w-[500px] rounded-xl shadow-lg p-3">
          <form method="dialog">
            <button className="btn btn-sm text-xl   btn-circle text-gray-400 btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="p-2 pt-8 text-lg ">Are you sure you want to remove this friend ?</h3>
          <div className="flex justify-center gap-2 pt-2">
            <form method="dialog">
            <button className="text-sm hover:bg-gray-800 bg-gray-700 text-gray-200 rounded-md px-3 py-1">
              Cancel
            </button>
            </form>
           <form method="dialog">
           <button onClick={()=>handleRemoveFriend(selectedConversation._id)} className="text-sm hover:bg-red-800 bg-red-700 text-gray-200 rounded-md px-3 py-1">
              Remove
            </button>
           </form>
          </div>
        </div>
     </dialog>
     <div className="dropdown dropdown-bottom  dropdown-end">
       <div tabIndex={0} role="button" className="btn text-xl bg-transparent hover:bg-quaternary border-none text-gray-200 "><BsThreeDotsVertical/></div>
        <ul tabIndex={0} className="dropdown-content menu bg-quaternary rounded-box z-[1] w-auto  p-2 shadow">
         <li><button  onClick={() => document.getElementById("removeFriend").showModal()} className="text-red-500 flex w-auto flex-nowrap items-center text-sm hover:bg-primary"><p className="text-nowrap">Remove Friend</p><LuUserMinus2/></button></li>
        </ul>
     </div>
    </div>
  );
};

export default User;
