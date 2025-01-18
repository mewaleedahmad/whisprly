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
import { useState,useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {profileAccountSchema, profilePasswordSchema} from "../lib/profileSchema.js"


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

const {
  register: accountInfo,
  handleSubmit: submitAccountInfo,
  formState: { errors: accountInfoErrors, isSubmitting: isSubmittingAccountInfo },
} = useForm({ resolver: zodResolver(profileAccountSchema) });

const {
  register: accountPassword,
  handleSubmit: submitAccountPassword,
  formState: { errors: accountPasswordErrors, isSubmitting: isSubmittingAccountPassword },
} = useForm({ resolver: zodResolver(profilePasswordSchema) });

const handleAccountInfo =async (data) => {
  console.log(data)
  }
  const handleAccountPassword = async(pass) => {
    console.log(pass)
  }

  return (
    <div className="w-full h-screen flex  justify-center overflow-hidden  ">
      <div className=" w-full  flex flex-col justify-center items-center py-5 pb-12 background-blur">
        <Logo/>
        <form  >
          <div className="avatar relative  flex justify-center ">
            <div className="w-44 bg-primary skeleton  rounded-full">
              <img  src={imagePreview ? imagePreview : authUser.profilePic}  />
              <div className="absolute -bottom-1 right-4">
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
        </form>


       <div className="w-72 flex justify-center flex-col gap-3 mt-10">

         <div className="flex justify-between items-center text-sm mb-5 bg-[#1d232a] font-semibold text-gray-200 rounded-lg ">
          <button type="button" onClick={()=>setSelectedTab("Account")} className={`${selectedTab === "Account" ? "bg-primary" : ""} px-8 py-[5px] m-1 rounded-md`}>Account</button>
          <span className="text-gray-700"> | </span>
          <button type="button" onClick={()=>setSelectedTab("Password")} className={`${selectedTab === "Password" ? "bg-primary" : ""} px-8 py-[5px] m-1 rounded-md`}>Password</button>
         </div>

         <form onSubmit={submitAccountInfo(handleAccountInfo)} className={`${selectedTab === "Account" ? "flex" : "hidden"} flex-col gap-3`}>
            <label className="input input-bordered input-field-styles flex items-center gap-2">
              <MdEmail />
              <input
                type="text"
                {...accountInfo("newEmail")}
                className="auth-btn bg-primary"
                placeholder={authUser.email}
              />
            </label>
            {accountInfoErrors.newEmail && <p className="error-msg">{accountInfoErrors.newEmail.message}</p>}

            <label className="input input-bordered input-field-styles flex items-center gap-2">
              <FaUserCircle />
              <input
                type="text"
                {...accountInfo("newUserName")}
                className="auth-btn"
                placeholder={authUser.userName}
              />
            </label>
            {accountInfoErrors.newUserName && <p className="error-msg">{accountInfoErrors.newUserName.message}</p>}

            <label className="input input-bordered input-field-styles flex items-center gap-2">
              <BiSolidUser />
              <input
                type="text"
                {...accountInfo("newFullName")}
                className="auth-btn"
                placeholder={authUser.fullName}
              />
            </label>
            {accountInfoErrors.newFullName && <p className="error-msg">{accountInfoErrors.newFullName.message}</p>}

            <button
              type="submit"
              disabled={isSubmittingAccountInfo}
              className="text-white w-72 mt-1 bg-gradient-to-r from-[#863ffa] to-[#3ec0fc] hover:bg-gradient-to-br font-medium rounded-lg text-sm px-5 py-2.5"
            >
              {isSubmittingAccountInfo ? <span className="loading loading-spinner"></span> : "Update"}
            </button>
          </form>

          <form
            onSubmit={submitAccountPassword(handleAccountPassword)}
            className={`${selectedTab === "Password" ? "flex" : "hidden"} flex-col gap-3`}
          >
            <label className="input input-bordered input-field-styles flex items-center gap-2">
              <IoKey />
              <input
                type="password"
                {...accountPassword("oldPassword")}
                className="auth-btn"
                placeholder="Old Password"
              />
            </label>
            {accountPasswordErrors.oldPassword && <p className="error-msg">{accountPasswordErrors.oldPassword.message}</p>}

            <label className="input input-bordered input-field-styles flex items-center gap-2">
              <IoKey />
              <input
                type="password"
                {...accountPassword("newPassword")}
                className="auth-btn"
                placeholder="New Password"
              />
            </label>
            {accountPasswordErrors.newPassword && <p className="error-msg">{accountPasswordErrors.newPassword.message}</p>}

            <label className="input input-bordered input-field-styles flex items-center gap-2">
              <IoKey />
              <input
                type="password"
                {...accountPassword("confirmNewPassword")}
                className="auth-btn"
                placeholder="Confirm New Password"
              />
            </label>
            {accountPasswordErrors.confirmNewPassword && <p className="error-msg">{accountPasswordErrors.confirmNewPassword.message}</p>}

            <button
              type="submit"
              disabled={isSubmittingAccountPassword}
              className="text-white w-72 mt-1 bg-gradient-to-r from-[#863ffa] to-[#3ec0fc] hover:bg-gradient-to-br font-medium rounded-lg text-sm px-5 py-2.5"
            >
              {isSubmittingAccountPassword ? <span className="loading loading-spinner"></span> : "Update Password"}
            </button>
          </form>

      </div>
      
        
       <Link to={"/"} className="text-xs w-72 btn mt-1 btn-ghost hover:bg-quaternary text-gray-400 ">Go Back</Link>

      </div>
    </div>
  );
};

export default Profile;
