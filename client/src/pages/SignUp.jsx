import { IoKey } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { BiSolidUser,BiMaleFemale } from "react-icons/bi";
import { useState } from "react";
const SignUp = () => {

  const getValue = (e)=>{
    const value = e.target.value
    setGender(value)
  }
  const [gender,setGender] = useState("")
  return (
    <div className="w-full min-h-screen flex  justify-center overflow-hidden  ">
      <div className=" w-full  lg:flex lg:flex-col lg:justify-center   py-5 pb-12  overflow-hidden backdrop-filter backdrop-blur-2xl bg-opacity-10   bg-primary shadow-2xl rounded-xl">
        <div className="hello text-xl lg:absolute lg:top-6 lg:left-3 mx-4 flex items-center gap-1">
          <img src="/favicon.png" className="size-8" />
          <p className="font-bold gradient-text">Whisperly</p>
        </div>
        <div className="flex flex-col items-center justify-center mt-20">
          <h1 className="text-center text-[2rem] font-semibold gradient-text ">
            Create Your Account
          </h1>

          <form className="w-72 flex flex-col gap-3 mt-10">

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
            <label className="input input-bordered overflow-hidden flex items-center ">
              <BiMaleFemale />
              <select onChange={getValue} className={`select px-2 capitalize ${(gender === "male" || gender === "female") ? "auth-btn" : ""} text-base focus:outline-none focus:ring-0 focus:border-0 w-full max-w-xs`}>
             <option disabled selected>Gender</option>
             <option>male</option>
             <option>female</option>
           </select>
            </label>
            <label className="input input-bordered flex items-center gap-2">
              <IoKey />
              <input type="password" className="auth-btn" placeholder="Password" />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              <IoKey />
              <input type="password" className="auth-btn " placeholder="Confirm Password" />
            </label>

          </form>
        <button
          type="button"
          className="text-white w-72 mt-5 bg-gradient-to-r from-[#863ffa] to-[#3ec0fc] hover:bg-gradient-to-br focus:ring-2 focus:outline-none focus:ring-purple-800 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
            Register
        </button>
        <div className="flex items-center mt-1 gap-2 text-sm">
          <p className="capitalize">account already exists ?</p>
          <Link to="/login" className="text-[#3e88cc] hover:underline">Login</Link>
        </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
