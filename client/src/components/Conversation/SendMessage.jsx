import { FaPaperclip } from "react-icons/fa6";
import { IoMdSend } from "react-icons/io";

// import {  useState } from "react";
import useSendMessage from "../../hooks/useSendMessage";
import useGlobalState from "../../zustand/useGlobalState";
import { useForm } from "react-hook-form";

const SendMessage = () => {
  // const [message,setMessage] = useState()
  const {sendMessage} = useSendMessage()
  const {selectedConversation,conversations,setAddConversation} = useGlobalState()
  const convoAlreadyExits = conversations.includes(selectedConversation)
  const {
    register,
    handleSubmit,
    reset,
    formState: {isSubmitting}
} = useForm()



  const onSubmit = async(message)=>{
    await sendMessage(selectedConversation._id,message)
    if(!convoAlreadyExits){
      setAddConversation(selectedConversation)
    }
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}  className="w-full ps-4 flex gap-2 items-center justify-between px-3 py-4 bg-transparent  border-t borderColor">
       <div className="input-file">
    <label htmlFor="file-input" className="size-11 flex items-center text-gray-400 hover:text-gray-200 text-2xl cursor-pointer justify-center ">
       <FaPaperclip/>
     </label>
     <input type="file" id="file-input" className="hidden"
       onChange={(e) => console.log(e.target.files[0])} />
    </div>
    <div className="input-text grow">
    <label className="input input-bordered flex items-center  bg-transparent border borderColor">
        <input {...register("message")} autoComplete="off" type="text" className="grow text-gray-300 " name="message" placeholder={`What's in your mind.....`} />
      </label>
    </div>
    <button disabled={isSubmitting}  type="submit"  className="bg-transparent text-gray-400 rounded-badge hover:text-gray-200   text-3xl">
        <IoMdSend/>
    </button>
    </form>
  );
};

export default SendMessage;


 {/* <div className="input-file">
    <label htmlFor="file-input" className="size-11 flex items-center hover:text-gray-200 text-2xl cursor-pointer justify-center ">
       <FaPaperclip/>
     </label>
     <input type="file" id="file-input" className="hidden"
       onChange={(e) => console.log(e.target.files[0])} />
    </div> */}


     // const handleSendMessage = async(e)=>{
  //   e.preventDefault()
  //   if (!message.trim()) {
  //     return;
  //   }
  //   try {
  //     await sendMessage(selectedConversation._id, message); 
  //     setMessage(""); 
  //   } catch (error) {
  //     console.error("Error sending message:", error);
  //   }
  // }