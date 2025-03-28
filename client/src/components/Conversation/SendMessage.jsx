import { CiImageOn } from "react-icons/ci";
import { IoMdSend } from "react-icons/io";
import { MdCancel} from "react-icons/md";

import useSendMessage from "../../hooks/useSendMessage";
import useGlobalState from "../../zustand/useGlobalState";
import { useForm } from "react-hook-form";
import { useState } from "react";
import toast from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";


const SendMessage = () => {
  const {sendMessage} = useSendMessage()
  const [image,setImage] = useState(null)
  const {selectedConversation,conversations,setAddConversation} = useGlobalState()
  const convoAlreadyExists = Array.isArray(conversations) && conversations?.includes(selectedConversation)
  const {
    register,
    handleSubmit,
    reset,
    formState: {isSubmitting}
} = useForm()
 
  const handleImageUpload = (i) =>{
    const allowedFileTypes =[
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
      "image/heic",
      "image/heif",
    ];
    if(!i) return;
  
    if(!allowedFileTypes.includes(i.type)){
      toast.error("Please select an image file")
      return
    }

    if(i.size > 8 * 1024 * 1024){
      toast.error("Please select an image less than 8 mb")
      return 
  }
   
    const reader = new FileReader()
      reader.onloadend  = ()=>{
        setImage(reader.result)
        document.getElementById("file-input").value = null;
      }
      reader.readAsDataURL(i)
    }
  
  const handleRemoveImage = ()=>{
    setImage(null)
  }

  const handleFullScreenPreview = () => {
    document.getElementById("imgSelectionPreview").showModal()
  }

  const onSubmit = async(message)=>{
    if(!message && !image){
      return null
    }
    const msgData = {}
    if(message){
      msgData.message = message
    }
    if(image){
     msgData.image = image
    }
    
    await sendMessage(selectedConversation?._id,msgData)
    if(!convoAlreadyExists){
      setAddConversation(selectedConversation)
    }
    reset()
    setImage(null)
  }

  return (
    <>
    <form onSubmit={handleSubmit(onSubmit)}  className="w-full  flex gap-3 items-center justify-between px-3 py-3 bg-transparent  border-t borderColor">
      {image && 
      <div className="absolute bg-quaternary rounded-md p-[2px] bottom-[75px] left-1">
        <div onClick={()=>handleRemoveImage()} className="absolute right-0 cursor-pointer top-0 "><MdCancel className="size-[18px] text-gray-400 "/></div>
      <img src={image} className=" size-[4.5rem] cursor-pointer rounded-md" onClick={()=>handleFullScreenPreview()}/>
      </div>
      }
       <div className="input-file">
    <label htmlFor="file-input" className=" flex items-center text-gray-500 hover:text-gray-200  cursor-pointer justify-center ">
       <CiImageOn className="size-8"/>
     </label>
     <input type="file" id="file-input" accept="image/png, image/jpeg, image/jpg, image/webp, image/heic ,image/heif" className="hidden"
       onChange={(e) => handleImageUpload(e.target.files[0])} />
    </div>
    <div className="input-text grow">
    <label className="input input-bordered flex items-center  bg-transparent border borderColor">
        <input {...register("message")} autoComplete="off" type="text" className="grow text-gray-300 " name="message" placeholder={`What's in your mind.....`} />
      </label>
    </div>
    <button disabled={isSubmitting}  type="submit"  className="bg-transparent text-gray-500 rounded-badge hover:text-gray-200   text-3xl">
        <IoMdSend/>
    </button>
    </form>

 <dialog id="imgSelectionPreview" className="modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-80">
      <div className="modal-box relative bg-transparent p-0">
        <div className="header flex items-end justify-end gap-4 p-3  text-gray-300 text-3xl">
          <button onClick={() => document.getElementById("imgSelectionPreview").close()} className="hover:text-gray-100">
            <RxCross2 />
          </button>
        </div>
        <div className={`overflow-hidden flex justify-center items-center ${!image ? 'skeleton' : ''}`}>
          {image && (
            <img src={image} alt="profile-pic" className="max-w-full max-h-full object-contain" />
          )}
        </div>
      </div>
    </dialog>
   </>
    
  );
};

export default SendMessage;
