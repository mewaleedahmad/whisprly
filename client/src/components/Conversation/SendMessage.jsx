import { FaPaperclip } from "react-icons/fa6";
import { IoMdSend } from "react-icons/io";
import {  useState } from "react";

const SendMessage = () => {
  const [message,setMessage] = useState()
  
  const sendMessage =(e)=>{
    e.preventDefault()
    setMessage("")
    console.log(message)
  }

  return (
    <form onSubmit={sendMessage} className="w-full flex gap-2 items-center justify-between px-3 py-4 bg-transparent  border-t borderColor">
    <div className="input-file">
    <label htmlFor="file-input" className="size-11 flex items-center hover:text-gray-200 text-2xl cursor-pointer justify-center ">
       <FaPaperclip/>
     </label>
     <input type="file" id="file-input" className="hidden"
       onChange={(e) => console.log(e.target.files[0])} />
    </div>
    <div className="input-text grow">
    <label className="input input-bordered flex items-center  bg-transparent border borderColor">
        <input onChange={(e)=>setMessage(e.target.value)} value={message} type="text" className="grow text-gray-300 " placeholder={`What's in your mind.....`} />
      </label>
    </div>
    <button  type="submit"  className="bg-transparent rounded-badge hover:text-gray-200   text-3xl">
        <IoMdSend/>
    </button>
    </form>
  );
};

export default SendMessage;
