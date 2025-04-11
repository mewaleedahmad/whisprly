import { useAuthContext } from "../../context/AuthContext";
import useGlobalState from "../../zustand/useGlobalState";
import { useEffect, useRef,useState } from "react";
import useMarkMessageSeen from "../../hooks/useMarkMessageSeen";
import { RxCross2 } from "react-icons/rx";
import { LiaDownloadSolid } from "react-icons/lia";
import toast, { Toaster } from "react-hot-toast";
import { TiTick } from "react-icons/ti";
import Lottie from "lottie-react"
import { HiOutlineDotsVertical } from "react-icons/hi";
import animationData from "../../lib/uploading-Lottie.json"

const ConversationContainer = () => {
  const {messages,selectedConversation,loadingState} = useGlobalState()
  const {authUser} = useAuthContext()
  const [showMsgInfoId,setShowMsgInfoId] = useState(null)
  const [previewImage,setPreviewImage] = useState(null)
  const {markMessageSeen} = useMarkMessageSeen()
  const myMessage = authUser._id
  const myPic = authUser.profilePic
  const messagesEndRef = useRef(null)

  const scroll = () => {
    messagesEndRef.current?.scrollIntoView()
  }
  const scrollToBottom = ()=>{
    scroll()
  }

  const handleMsgInfo = (id)=>{
    setShowMsgInfoId(id)
  }
  const handlePreview = (url)=>{
    setPreviewImage(url)
    document.getElementById("fullScreenPreview").showModal()
  }

  const handleDownload = async () => {
  if (previewImage) {
    try {
      const response = await fetch(previewImage);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute('download', `image-${Date.now()}.${previewImage.split(".").pop()}`);
      document.body.appendChild(link);
      link.click();
      toast.success("Image Saved")
      document.body.removeChild(link);

      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to download image:", error);
    }
  }
  };

  function getLocalTime(isoString,option) {
    try {
      const date = new Date(isoString); // Parse the ISO string
      if(option){
        const options = {day: 'numeric', month: 'long', year: 'numeric' };
       return date.toLocaleDateString('en-US', options);
      }else{
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Format time in local time zone
      }
    } catch (error) {
      console.error("Invalid ISO string provided:", error);
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    const lastMessage = messages?.[messages.length - 1];
    
    if (lastMessage && 
        selectedConversation?._id && 
        lastMessage.receiverId === authUser._id && 
        lastMessage.senderId === selectedConversation._id && 
        !lastMessage.seen) {
      markMessageSeen(selectedConversation._id);
    }
  }, [messages, selectedConversation?._id, authUser._id]);

  
  return (
    <div className="w-full py-2 h-full">
      <section className="xl:px-4 px-2 py-4  flex hidden-scrollable-div flex-col gap-4">
        {loadingState ? 
          <>
          {[1,2,3,4].map((i)=>(
            <div key={i}>
              <div className="chat chat-end">
            <div className="chat-image   avatar">
              <div className="w-11 h-11  bg-secondary rounded-full skeleton"></div>
            </div>
            <div className="chat-bubble bg-secondary  skeleton xl:w-40 w-32"></div>
          </div>
            <div className="chat chat-start">
            <div className="chat-image   avatar">
              <div className="w-11 h-11  bg-secondary rounded-full skeleton"></div>
            </div>
            <div className="chat-bubble bg-secondary  skeleton xl:w-40 w-32 "></div>
          </div>
            </div>
          ))}
          </>
         : 
        <>
          {messages?.map((msg)=>(
            <div key={msg?._id}>
            {((msg.senderId === authUser._id && msg.receiverId === selectedConversation?._id) || (msg.senderId === selectedConversation._id && msg.receiverId === authUser._id)) 
            &&
            <div key={msg?._id} onMouseEnter={()=>handleMsgInfo(msg?._id)} onMouseLeave={()=>handleMsgInfo(null)} className={`chat  ${msg?.senderId === myMessage ? "chat-end" : "chat-start"} `}>
            <div className="chat-header flex text-gray-300 items-center gap-[2px] text-xs ms-3 me-1 mb-1 opacity-80">
                <p>{getLocalTime(msg?.createdAt)} </p>
                {!msg.isOptimistic && msg.senderId === authUser._id && <TiTick className="text-gray-400"  />  }               
            </div>
          <div className="chat-image avatar">
            <div className="w-10 bg-secondary skeleton rounded-full">
              <img
                src={msg?.senderId === myMessage ? myPic : selectedConversation.profilePic}
                />
            </div>
          </div>
         <div className={`flex ${msg?.senderId === authUser._id ? "flex-row-reverse" : ""} gap-2 items-center`}>
           <div className={`chat-bubble text-[14px] ${msg.image ? "p-[2px]  " : ""}  max-w-[260px] xl:max-w-[300px] flex flex-col gap-[5px] items-start justify-center  xl:text-base text-gray-100 ${msg?.senderId === myMessage ? "bg-violet-700" : "bg-secondary"}  `}>
            <>
            {msg.image && <img onLoad={()=>scrollToBottom()} src={msg.image} className={`rounded-2xl overflow-hidden cursor-pointer`} onClick={()=>handlePreview(msg.image)} />}
            {msg.message && <p className={`${msg?.image ? "px-3" : ""}`}>{msg.message}</p>}
            {msg.image && msg.isOptimistic && 
            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-2xl">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="size-12 text-white">
                  <Lottie
                    animationData={animationData}
                    loop={true}
                  />
                </div>
              </div>
            </div>
            }
            </>
            </div>
           {
             (showMsgInfoId === msg._id) &&
               <div className={`dropdown dropdown-top ${msg?.senderId === authUser._id ? "dropdown-top" : "dropdown-left"}  rounded-full p-[5px] hover:bg-secondary`} >
                 <div tabIndex={0}>
                   <HiOutlineDotsVertical className="cursor-pointer  hover:text-gray-200 text-gray-400"/>
                 </div>
                 <ul tabIndex={0} className="dropdown-content my-2 text-gray-400 menu bg-quaternary rounded-lg z-10 w-28 shadow-sm" >
                   <li className=" text-center ">{getLocalTime(msg.createdAt,"option")}</li>
                 </ul>
               </div>
            }
         </div>
          {
            msg.senderId == myMessage && 
             <h5 className="chat-footer text-gray-300 text-xs mx-1 opacity-80">
               {msg?.seen && <p>seen</p>}
            </h5>
          }

          <dialog id="fullScreenPreview" className="modal fixed inset-0 z-50 bg-black bg-opacity-80 overflow-hidden">
            <Toaster
              position="top-center"
              reverseOrder={false}
              toastOptions={{
                style: {
                  background: '#171b1d', 
                  color: 'white', 
                  duration: 3000,
                },
              }}
            />
            <div className="absolute top-4 right-6 flex gap-1 z-10">
              <button 
                onClick={() => handleDownload()} 
                className="p-2 rounded-full border-none outline-none bg-black bg-opacity-50 text-white hover:bg-quaternary transition-all"
              >
                <LiaDownloadSolid size={24} />
              </button>
              <button 
                onClick={() => document.getElementById("fullScreenPreview").close()} 
                className="p-2 rounded-full border-none outline-none bg-black bg-opacity-50 text-white hover:bg-quaternary transition-all"
              >
                <RxCross2 size={24} />
              </button>
            </div>
            <div className="w-full h-full flex items-center justify-center">
              {previewImage && (
                <img 
                  src={previewImage} 
                  className="max-h-[90vh] max-w-[90vw] object-contain" 
                  alt="Preview"
                />
              )}
            </div>
          </dialog>

        </div>
            }
            </div>
          ))}
          <div ref={messagesEndRef} />
        </>
        }
      </section>
    </div>
  );
};

export default ConversationContainer;