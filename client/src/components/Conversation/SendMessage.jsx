/* eslint-disable react/prop-types */
import { FaPaperclip } from "react-icons/fa6";
import { IoMdSend } from "react-icons/io";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import {  useState } from "react";

const SendMessage = ({setMessage}) => {
  const [message,getMessage] = useState()
  const allMessages = []
  
  const sendMessage =()=>{
    allMessages.push((prev=>[...prev,message]))
    setMessage(allMessages)
    console.log(allMessages)
  }

  return (
    <form className="w-full flex gap-2 items-center justify-between px-3 py-4 bg-transparent  border-t borderColor">
    <div className="input-file">
    <label htmlFor="file-input" className="size-11 flex items-center hover:text-gray-200 text-2xl cursor-pointer justify-center ">
       <FaPaperclip/>
     </label>
     <input type="file" id="file-input" className="hidden"
       onChange={(e) => console.log(e.target.files[0])} />
    </div>
    <div className="input-text grow">
    <label className="input input-bordered flex items-center  bg-transparent border borderColor">
        <input onChange={(e)=>getMessage(e.target.value)} type="text" className="grow text-gray-300 " placeholder={`What's in your mind.....`} />
        <button className="pl-5 text-gray-300 text-2xl">
            <HiOutlineEmojiHappy/>
        </button>
      </label>
    </div>
    <button  type="button" onClick={()=>sendMessage()} className="bg-transparent rounded-badge hover:text-gray-200   text-3xl">
        <IoMdSend/>
    </button>
    </form>
  );
};

export default SendMessage;
