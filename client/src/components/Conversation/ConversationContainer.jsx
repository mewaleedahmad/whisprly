import { useAuthContext } from "../../context/AuthContext";
import useGlobalState from "../../zustand/useGlobalState";
import { useEffect, useRef,useState } from "react";
import useMarkMessageSeen from "../../hooks/useMarkMessageSeen";
import { RxCross2 } from "react-icons/rx";
import { LiaDownloadSolid } from "react-icons/lia";
import toast, { Toaster } from "react-hot-toast";

const ConversationContainer = () => {
  const {messages,selectedConversation,loadingState} = useGlobalState()
  const {authUser} = useAuthContext()
  const [previewImage,setPreviewImage] = useState(null)
  const {markMessageSeen} = useMarkMessageSeen()
  const myMessage = authUser._id
  const myPic = authUser.profilePic
  const messagesEndRef = useRef(null)

  const scroll = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }
  const scrollToBottom = ()=>{
    scroll()
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

  function getLocalTime(isoString) {
    try {
      const date = new Date(isoString); // Parse the ISO string
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Format time in local time zone
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
      <section className="lg:px-4 px-2 py-4  flex hidden-scrollable-div flex-col gap-4">
        {loadingState ? 
          <>
          {[1,2,3,4].map((i)=>(
            <div key={i}>
              <div className="chat chat-end">
            <div className="chat-image   avatar">
              <div className="w-11 h-11  bg-secondary rounded-full skeleton"></div>
            </div>
            <div className="chat-bubble bg-secondary  skeleton lg:w-40 w-32"></div>
          </div>
            <div className="chat chat-start">
            <div className="chat-image   avatar">
              <div className="w-11 h-11  bg-secondary rounded-full skeleton"></div>
            </div>
            <div className="chat-bubble bg-secondary  skeleton lg:w-40 w-32 "></div>
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
            <div key={msg?._id} className={`chat ${msg?.senderId === myMessage ? "chat-end" : "chat-start"} `}>
            <h5 className="chat-header text-xs mx-1 mb-1 opacity-80">
                {getLocalTime(msg?.createdAt)}                  
            </h5>
          <div className="chat-image avatar">
            <div className="w-10 bg-quaternary rounded-full">
              <img
                src={msg?.senderId === myMessage ? myPic : selectedConversation.profilePic}
                />
            </div>
          </div>
          <div className={`chat-bubble text-[14px] ${msg.image ? "p-1  " : ""}  max-w-[270px] flex flex-col gap-[5px] items-start justify-center  lg:text-base text-gray-100 ${msg?.senderId === myMessage ? "bg-violet-700" : "bg-secondary"} `}>
            <>
            {msg.image && <img onLoad={()=>scrollToBottom()} src={msg.image} className="rounded-xl cursor-pointer" onClick={()=>handlePreview(msg.image)} />}
            {msg.message && <p className={`${msg?.image ? "ps-3" : ""}`}>{msg.message}</p>}
            </>
          </div>
          {
            msg.senderId == myMessage && 
             <h5 className="chat-footer text-xs mx-1 opacity-80">
               {msg?.seen && <p>seen</p>}
            </h5>
          }

          <dialog id="fullScreenPreview" className="modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-80">
            <Toaster
                 position="top-center"
                 reverseOrder={false}
                 toastOptions={{
                  style: {
                    background: '#171b1d', 
                    color: 'white', 
                    duration : 3000,
                  },
                }}
               />
              <div className="modal-box scrollable-div max-w-3xl relative bg-transparent p-0">
                <div className="header  flex items-end justify-end gap-3 py-2 px-1  text-gray-300 text-3xl">
                    <button onClick={() => handleDownload()} className="hover:text-gray-100 btn-ghost hover:bg-primary p-[5px]  rounded-full">
                      <LiaDownloadSolid />
                    </button>
                  <button onClick={() => document.getElementById("fullScreenPreview").close() } className="hover:text-gray-100 btn-ghost hover:bg-primary p-[5px]  rounded-full">
                    <RxCross2 />
                  </button>
                </div>
                <div className={` flex justify-center items-center `}>
                  {previewImage && (
                    <img src={previewImage}  className="w-full object-contain  max-h-max" />
                  )}
                </div>
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