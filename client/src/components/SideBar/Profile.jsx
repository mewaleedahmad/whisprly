import { GrLogout } from "react-icons/gr";
import { TbMenuDeep } from "react-icons/tb";
import { FaUserFriends } from "react-icons/fa";

import { Link } from "react-router-dom";

import useLogout from "../../hooks/useLogout";

const Profile = () => {
  const { logout } = useLogout();
  return (
    <div className="w-full flex items-center justify-between p-5  border-b borderColor">
      <Link to="/profile" className="flex  gap-2">
        <div className="avatar">
          <div className="w-12 rounded-full">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </div>
        </div>
        <div className="name ">
          <h2>Waleed Ahmad</h2>
          <h5 className="ps-1 text-xs">waleed_gondal</h5>
        </div>
      </Link>

      <div className="dropdown dropdown-bottom dropdown-end">
        <div  tabIndex={0}  role="button"  className="btn text-2xl btn-ghost text-gray-300 hover:bg-secondary ">
          <TbMenuDeep />
        </div>
        <ul tabIndex={0}  className="dropdown-content bg-secondary menu text-gray-300  rounded-box z-[1] w- shadow" >
          <li>
            <button onClick={() => document.getElementById("my_modal_3").showModal()} className="text-md">
              <span className="text-nowrap">Friend Requests</span>
              <FaUserFriends />
            </button>
          </li>
          <li>
            <button onClick={logout} className="bg-transparent border-none text-md" >
              <span>Logout</span>
              <GrLogout />
            </button>
          </li>
        </ul>
      </div>

      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <button className="btn hidden">open modal</button>
      <dialog id="my_modal_3" className="modal ">
        <div className="modal-box absolute top-24 lg:relative lg:top-0  bg-secondary w-full lg:w-[400px] lg:max-w-[500px] rounded-xl shadow-lg p-3">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-2xl mb-5 mt-1">Friend Requests</h3>
          
          <div className="w-full flex items-center justify-between py-2  cursor-default hover:bg-secondary">
           <div className="flex gap-2 items-center  flex-grow">
             <div className={`avatar`}>
               <div className="w-10 rounded-full">
                 <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
               </div>
             </div>
             <div className="-space-y-1">
               <h2 className="text-base">Waleed Ahmad </h2>
               <h5 className="text-[11px]">waleed_gondal</h5>
             </div>
           </div>
           <div className="flex gap-2">
             <button className="text-xs hover:bg-red-800 bg-red-700 text-gray-200 rounded-md px-3 py-1">
               Reject
             </button>
             <button className="text-xs hover:bg-green-700 bg-green-600 text-gray-200 rounded-md px-3 py-1">
               Accept
             </button>
           </div>
         </div>

        </div>
      </dialog>
    </div>
  );
};

export default Profile;
