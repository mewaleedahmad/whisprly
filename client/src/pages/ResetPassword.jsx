import { IoKey,IoCheckmarkCircle } from "react-icons/io5";
import { Link, useParams } from "react-router-dom";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Logo from "../components/Logo";
import resetPasswordSchema from "../lib/resetPasswordSchema";
import { useState } from "react";
import toast from "react-hot-toast";

const ResetPassword =()=>{
 
  const [showSuccessBox,setShowSuccessBox] = useState(false)
  const [loading,setLoading] = useState(false)

  const {token} = useParams()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(resetPasswordSchema) });

  const handleResetPassword = async({password,confirmPassword})=>{
      setLoading(true)
      try {
        const response = await fetch(`/api/auth/reset-password/${token}`,{
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({password,confirmPassword})
        })
        const result = await response.json()

        if (!response.ok) {
          throw new Error(result.error || "An error occurred");
        }
        setShowSuccessBox(true)
      } catch (error) {
        toast.error(error.message || "Something went wrong");
      } finally {
        setLoading(false)
      }
  }

  const onSubmit = async(data) => {
     await handleResetPassword(data)
  }

  return (
    <>
      <div className="w-full min-h-screen flex  justify-center overflow-hidden  ">
        <div className=" w-full  lg:flex lg:flex-col lg:justify-center py-5 pb-12  overflow-hidden background-blur ">
          <Logo />
          {!showSuccessBox ? 
          <div className="flex flex-col items-center justify-center mt-40 lg:mt-6 ">
          <h1 className="text-center text-[2.4rem] font-semibold gradient-text ">
            Reset Password
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="w-72 flex flex-col gap-3 mt-6" >

            <label className="input input-bordered input-field-styles flex items-center gap-2">
              <IoKey />
              <input
                {...register("password")}
                type="password"
                className="auth-btn"
                placeholder="New Password"
              />
            </label>
            {errors.password && (
              <p className="error-msg">{errors.password.message}</p>
            )}

            <label className="input input-bordered input-field-styles flex items-center gap-2">
              <IoKey />
              <input
                {...register("confirmPassword")}
                type="password"
                className="auth-btn"
                placeholder="Confirm New Password"
              />
            </label>
            {errors.confirmPassword && (
              <p className="error-msg">{errors.confirmPassword.message}</p>
            )}
          <button
          disabled={isSubmitting}
          type="submit"
          className="text-white w-72 mt-2 bg-gradient-to-r from-[#863ffa] to-[#3ec0fc] hover:bg-gradient-to-br focus:ring-2 focus:outline-none focus:ring-purple-800 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            {loading ? <span className="loading loading-spinner"></span> : "Update Password"}
          </button>

     </form>
        </div>
        : 
        <div className="flex flex-col items-center justify-center mt-40 lg:mt-6">
          <div className=" w-[90%] lg:w-[40%] py-8 p-4 text-center bg-primary bg-opacity-80 rounded-lg shadow-lg border-y-4 border-[#863ffa]">
            <h1 className="text-3xl lg:text-4xl font-semibold mb-5 gradient-text flex items-center justify-center gap-2">
            <IoCheckmarkCircle className="text-[#863ffa] text-3xl lg:text-4xl" />
              Success
              </h1>
            <p className="text-gray-200 text-lg lg:text-2xl mb-8">Your password has been  updated.</p>
            <Link 
              to="/login" 
              className="text-white w-full bg-gradient-to-r from-[#863ffa] to-[#3ec0fc] hover:bg-gradient-to-br focus:ring-2 focus:outline-none focus:ring-purple-800 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Login Now
            </Link>
          </div>
        </div>
        }
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
