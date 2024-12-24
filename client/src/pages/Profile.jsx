import {MdEmail } from "react-icons/md";
import { FaCamera } from "react-icons/fa";
import {Link} from "react-router-dom"
import { IoKey } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { BiSolidUser } from "react-icons/bi";

import Logo from "../components/Logo";

const Profile = () => {
  return (
    <div className="w-full h-screen flex  justify-center overflow-hidden  ">
      <div className=" w-full  flex flex-col justify-center items-center py-5 pb-12 background-blur">
        <Logo/>
        <form  >
          <div className="avatar  flex justify-center mt-6">
            <div className="w-44  rounded-full">
              <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
              <div className="absolute -bottom-1 right-16">
             <label
               htmlFor="file-input" className="size-11 flex items-center justify-center bg-gradient text-white rounded-full cursor-pointer hover:bg-blue-700">
               <FaCamera />
             </label>
             <input
               type="file" id="file-input" className="hidden"
               onChange={(e) => console.log(e.target.files[0])} />
           </div>
            </div>
          </div>

     <div className="w-72 flex justify-center flex-col gap-3 mt-10">
        <label className="input input-bordered  flex items-center gap-2">
          <MdEmail />
          <input type="text" className="auth-btn  " placeholder="Email" />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <FaUserCircle />
          <input type="text" className="auth-btn" placeholder="Username" />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <BiSolidUser  />
          <input type="text" className="auth-btn" placeholder="Full Name" />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <IoKey />
          <input type="password" className="auth-btn" placeholder="Old Password" />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <IoKey />
          <input type="password" className="auth-btn " placeholder="New Password" />
        </label>
      </div>
      
        </form>
        <div className="flex flex-col  justify-center">
        <button type="button" className="text-white w-72 mt-5 bg-gradient-to-r from-[#863ffa] to-[#3ec0fc] hover:bg-gradient-to-br focus:ring-2 focus:outline-none focus:ring-purple-800 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
        Update
        </button>
       <Link to={"/"} className="text-xs w-72 btn btn-ghost hover:bg-black ">Go Back</Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
