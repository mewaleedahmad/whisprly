import { IoKey } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Logo from "../components/Logo";
import useLogin from "../hooks/useLogin";
import loginSchema from "../lib/loginSchema";

const Login = () => {

  const {login} = useLogin()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(loginSchema) });

  const onSubmit = async(data) => {
   await login(data)
  }

  return (
    <div className="w-full min-h-screen flex  justify-center overflow-hidden  ">
      <div className=" w-full  lg:flex lg:flex-col lg:justify-center py-5 pb-12  overflow-hidden background-blur ">
        <Logo />
        <div className="flex flex-col items-center justify-center mt-40 lg:mt-6 ">
          <h1 className="text-center text-[2.4rem] font-semibold gradient-text ">
            Login
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="w-72 flex flex-col gap-3 mt-6" >

            <label htmlFor="email" className="input input-bordered input-field-styles  flex items-center gap-2">
              <MdEmail />
              <input
                {...register("email")}
                type="text"
                id="email"
                className="auth-btn "
                placeholder="Email"
              />
            </label>
            {errors.email && (
              <p className="error-msg">{errors.email.message}</p>
            )}
            <label className="input input-bordered input-field-styles flex items-center gap-2">
              <IoKey />
              <input
                {...register("password")}
                type="password"
                className="auth-btn"
                placeholder="Password"
              />
            </label>
            {errors.password && (
              <p className="error-msg">{errors.password.message}</p>
            )}
          <button
          disabled={isSubmitting}
          type="submit"
          className="text-white w-72 mt-2 bg-gradient-to-r from-[#863ffa] to-[#3ec0fc] hover:bg-gradient-to-br focus:ring-2 focus:outline-none focus:ring-purple-800 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            {isSubmitting ? <span className="loading loading-spinner"></span> : "Login"}
          </button>

            </form>

            <Link to="#" className="capitalize hover:text-gray-400  text-gray-500 text-[13px] py-1 underline">Reset Password</Link>
          <div className="flex items-center mt-1 gap-2 text-sm">
            <p className="capitalize text-gray-500">{"Don't"} have account ?</p>
            <Link to="/signup" className="text-[#3e88cc] hover:underline">
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
