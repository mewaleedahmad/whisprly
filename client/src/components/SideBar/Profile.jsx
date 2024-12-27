import { GrLogout } from "react-icons/gr";
import { TbMenuDeep } from "react-icons/tb";
import { FaUserFriends } from "react-icons/fa";

import { useAuthContext } from "../../context/AuthContext";
import useGetFriendRequests from "../../hooks/useGetFriendRequests";
import useLogout from "../../hooks/useLogout";
import useAddFriend from "../../hooks/useAddFriend";
import useRejectFriendRequest from "../../hooks/useRejectFriendRequest";

import { Link } from "react-router-dom";
import { useState } from "react";

const Profile = () => {
  const { authUser } = useAuthContext();
  const { logout } = useLogout();
  const {addFriend} = useAddFriend()
  const { getFriendRequests } = useGetFriendRequests()
  const {rejectFriendRequest} = useRejectFriendRequest();

  const [loading, setLoading] = useState(false);
  const [requests, setRequests] = useState({ friendRequests: [] });
  
  const handleFriendRequests = async () => {
    const data = await getFriendRequests();
    setRequests(data);
    setLoading(true)
  };

  const handleAddFriend = async (id) => {
    await addFriend(id);
  }
  const handleRejectFriendRequest = async (id) => {
    await rejectFriendRequest(id);
  }

  return (
    <div className="w-full flex items-center justify-between p-5  border-b borderColor">
      {authUser && (
        <Link to="/profile" key={authUser._id} className="flex gap-2">
          <div className="avatar">
            <div className="w-12 rounded-full">
              <img src={authUser.profilePic} alt="Profile Pic" />
            </div>
          </div>
          <div className="name -space-y-1">
            <h2>{authUser.fullName}</h2>
            <h5 className="ps-1 text-xs">{authUser.userName}</h5>
          </div>
        </Link>
      )}

      <div className="dropdown dropdown-bottom dropdown-end">
        <div tabIndex={0} role="button" className="btn text-2xl btn-ghost text-gray-300 hover:bg-secondary ">
          <TbMenuDeep />
        </div>
        <ul tabIndex={0} className="dropdown-content bg-secondary menu text-gray-300  rounded-box z-[1] w- shadow">
          <li>
            <button  onClick={() => {document.getElementById("my_modal_3").showModal(),handleFriendRequests();}}  className="text-md">
              <span className="text-nowrap">Friend Requests</span>
              <FaUserFriends />
            </button>
          </li>
          <li>
            <button onClick={logout} className="bg-transparent border-none text-md">
              <span>Logout</span>
              <GrLogout />
            </button>
          </li>
        </ul>
      </div>


      <dialog id="my_modal_3" className="modal ">
        <div className="modal-box absolute py-6 top-24 lg:relative lg:top-0  bg-secondary w-full lg:w-[400px] lg:max-w-[500px] rounded-xl shadow-lg p-3">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-semibold text-2xl mb-5 mt-1">Friend Requests</h3>
         {!loading ? <span className="loading loading-spinner"></span> : 
         <>
           {(!requests.message) || requests.length === 0  ? (
            requests.friendRequests.map((user)=>(
              <div key={user._id} className="w-full flex items-center justify-between py-2  cursor-default hover:bg-secondary">
           <div className="flex gap-2 items-center  flex-grow">
             <div className={`avatar`}>
               <div className="w-10 rounded-full">
                 <img src={user.profilePic} />
               </div>
             </div>
             <div className="-space-y-1">
               <h2 className="text-base">{user.fullName}</h2>
               <h5 className="text-[11px]">{user.userName}</h5>
             </div>
           </div>
           <div className="flex gap-2">
             <button  onClick={()=>handleRejectFriendRequest(user._id)} className="text-xs hover:bg-red-800 bg-red-700 text-gray-200 rounded-md px-3 py-1">
               Reject
             </button>
             <button onClick={()=>handleAddFriend(user._id)} className="text-xs hover:bg-green-700 bg-green-600 text-gray-200 rounded-md px-3 py-1">
               Accept
             </button>
           </div>
         </div>
            ))
          ) : (
            <p className=" text-base text-gray-300 ">Your friend request list is empty. Check back later!</p>
          )}
         </>
         }
        </div>
      </dialog>
    </div>
  );
};

export default Profile;
