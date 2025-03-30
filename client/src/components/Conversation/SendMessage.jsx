import { MdCancel} from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { VscSend } from "react-icons/vsc";
import { PiImagesSquare } from "react-icons/pi";

import useSendMessage from "../../hooks/useSendMessage";
import useGlobalState from "../../zustand/useGlobalState";
import { useForm } from "react-hook-form";
import { useState } from "react";
import toast from "react-hot-toast";


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
    if((message.message === "") && !image){
      return
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
      <img src={image} className=" size-[4rem] object-cover cursor-pointer rounded-md" onClick={()=>handleFullScreenPreview()}/>
      </div>
      }
       <div className="input-file">
    <label htmlFor="file-input" className=" flex items-center text-gray-500 hover:text-gray-300  cursor-pointer justify-center ">
       <PiImagesSquare className="size-8"/>
     </label>
     <input type="file" id="file-input" accept="image/png, image/jpeg, image/jpg, image/webp, image/heic ,image/heif" className="hidden"
       onChange={(e) => handleImageUpload(e.target.files[0])} />
    </div>
    <div className="input-text grow">
    <label className="input input-bordered flex items-center  bg-transparent border borderColor">
        <input {...register("message")}  autoComplete="off" type="text" className="grow text-gray-300 " name="message" placeholder={`What's in your mind.....`} />
      </label>
    </div>
    <button disabled={isSubmitting}  type="submit"  className="bg-transparent text-gray-500 rounded-badge hover:text-gray-300   text-3xl">
        <VscSend/>
    </button>
    </form>

     <dialog id="imgSelectionPreview" className="modal fixed inset-0 z-50 bg-black bg-opacity-80 overflow-hidden">
            
            <div className="absolute top-4 right-6 flex gap-1 z-10">
              <button 
                onClick={() => document.getElementById("imgSelectionPreview").close()} 
                className="p-2 rounded-full bg-black border-none outline-none bg-opacity-50 text-white hover:bg-quaternary transition-all"
              >
                <RxCross2 size={24} />
              </button>
            </div>
            <div className="w-full h-full flex items-center justify-center">
              {image && (
                <img 
                  src={image} 
                  className="max-h-[90vh] max-w-[90vw] object-contain" 
                  alt="Preview"
                />
              )}
            </div>
       </dialog>
   </>
    
  );
};

export default SendMessage;
