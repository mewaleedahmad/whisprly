import {MdEmail } from "react-icons/md";
import { FaCamera } from "react-icons/fa";
import {Link} from "react-router-dom"
import { IoKey } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { BiSolidUser } from "react-icons/bi";

import toast from "react-hot-toast";
import 'react-image-crop/dist/ReactCrop.css';
import ReactCrop from 'react-image-crop';

import Logo from "../components/Logo";
import { useAuthContext } from "../context/AuthContext.jsx";
import { useState } from "react";


const Profile = () => {
  const {authUser} = useAuthContext()
  const [file,setFile] = useState(null)
  const [error,setError] = useState("")
  const [imagePreview,setImagePreview] = useState(null)
  const [crop,setCrop] = useState()
  const [selectedTab,setSelectedTab] = useState("Account")


  const handleFileUpload = (e)=>{
    const selectedFile = e.target.files[0]
    const validateFileType = ["image/png", "image/jpeg"]

    if(!validateFileType.includes(selectedFile.type)){
      setError("Please select an image file")
      setFile(null)
      return
    }
    if(selectedFile.size > 5 * 1024 * 1024){
      setError("Please select a file less than 5MB.")
      setFile(null)
      return 
  }
  if(selectedFile){
    const reader = new FileReader()
    reader.onloadend = () => {
      setImagePreview(reader.result)
      setFile(selectedFile)
      setError("")
    }
    reader.readAsDataURL(selectedFile)
  }
}

if(error){
  toast.error(error)
}

  return (
    <div className="w-full h-screen flex  justify-center overflow-hidden  ">
      <div className=" w-full  flex flex-col justify-center items-center py-5 pb-12 background-blur">
        <Logo/>
        <form  >
          <div className="avatar  flex justify-center mt-6">
            <div className="w-44  rounded-full">
              <img src={imagePreview ? imagePreview : authUser.profilePic} />
              <div className="absolute -bottom-1 right-16">
             <label
               htmlFor="file-input" className="size-11 flex items-center justify-center bg-gradient text-white rounded-full cursor-pointer hover:bg-blue-700">
               <FaCamera /> 
             </label>
             <input
               type="file" id="file-input" accept="image/png, image/jpeg" className="hidden"
               onChange={(e) => handleFileUpload(e)} />
           </div>
            </div>
          </div>

     <div className="w-72 flex justify-center flex-col gap-3 mt-10">
         <div className="flex justify-between items-center text-sm mb-2  bg-gray-800 font-semibold text-gray-200 rounded-lg ">
          <button type="button" onClick={()=>setSelectedTab("Account")} className={`${selectedTab === "Account" ? "bg-primary" : ""} px-8 py-[4px] m-1 rounded-md`}>Account</button>
          <span className="text-gray-700"> | </span>
          <button type="button" onClick={()=>setSelectedTab("Password")} className={`${selectedTab === "Password" ? "bg-primary" : ""} px-8 py-[4px] m-1 rounded-md`}>Password</button>
         </div>
        <div className={`update-info ${selectedTab === "Account" ? "flex" : "hidden"} flex flex-col gap-3`}>
        <label className="input input-bordered  flex items-center gap-2">
          <MdEmail />
          <input type="text" value={authUser.email} className="auth-btn  " placeholder="Email" />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <FaUserCircle />
          <input type="text" value={authUser.userName} className="auth-btn" placeholder="Username" />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <BiSolidUser  />
          <input type="text" value={authUser.fullName} className="auth-btn" placeholder="Full Name" />
        </label>
        <button type="button" className="text-white w-72  bg-gradient-to-r from-[#863ffa] to-[#3ec0fc] hover:bg-gradient-to-br focus:ring-2 focus:outline-none focus:ring-purple-800 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
        Update
        </button>
        </div>

        <div className={`update-password ${selectedTab === "Password" ? "flex" : "hidden"} flex flex-col gap-3`}>
        <label className="input input-bordered flex items-center gap-2">
          <IoKey />
          <input type="password" className="auth-btn" placeholder="Old Password" />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <IoKey />
          <input type="password" className="auth-btn " placeholder="New Password" />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <IoKey />
          <input type="password" className="auth-btn " placeholder="Confirm New Password" />
        </label>
        <button type="button" className="text-white w-72  bg-gradient-to-r from-[#863ffa] to-[#3ec0fc] hover:bg-gradient-to-br focus:ring-2 focus:outline-none focus:ring-purple-800 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
        Update Password
        </button>
        </div>

      </div>
      
        </form>
        
       <Link to={"/"} className="text-xs w-72 btn btn-ghost hover:bg-black ">Go Back</Link>

      </div>
    </div>
  );
};

export default Profile;
