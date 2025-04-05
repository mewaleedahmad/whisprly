import { useAuthContext } from "../../context/AuthContext";
import useGlobalState from "../../zustand/useGlobalState";
import { useEffect, useRef,useState } from "react";
import useMarkMessageSeen from "../../hooks/useMarkMessageSeen";
import { RxCross2 } from "react-icons/rx";
import { LiaDownloadSolid } from "react-icons/lia";
import toast, { Toaster } from "react-hot-toast";
import { TiTick } from "react-icons/ti";
import Lottie from "lottie-react"

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
            <div className="chat-header flex text-gray-300 items-center gap-[2px] text-xs mx-1 mb-1 opacity-80">
                <p>{getLocalTime(msg?.createdAt)} </p>
                {!msg.isOptimistic && msg.senderId === authUser._id && <TiTick   />  }               
            </div>
          <div className="chat-image avatar">
            <div className="w-10 bg-secondary skeleton rounded-full">
              <img
                src={msg?.senderId === myMessage ? myPic : selectedConversation.profilePic}
                />
            </div>
          </div>
          <div className={`chat-bubble text-[14px] ${msg.image ? "p-[2px]  " : ""}  max-w-[260px] lg:max-w-[300px] flex flex-col gap-[5px] items-start justify-center  lg:text-base text-gray-100 ${msg?.senderId === myMessage ? "bg-violet-700" : "bg-secondary"}  `}>
            <>
            {msg.image && <img onLoad={()=>scrollToBottom()} src={msg.image} className={`rounded-2xl overflow-hidden cursor-pointer`} onClick={()=>handlePreview(msg.image)} />}
            {msg.message && <p className={`${msg?.image ? "px-3" : ""}`}>{msg.message}</p>}
            {msg.image && msg.isOptimistic && 
            <div className="absolute inset-0 bg-black bg-opacity-40 rounded-2xl">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="size-12 text-white">
                  <Lottie
                    animationData={{"nm":"upload","ddd":0,"h":100,"w":100,"meta":{"g":"@lottiefiles/toolkit-js 0.33.2"},"layers":[{"ty":4,"nm":"circular","sr":1,"st":0,"op":120,"ip":0,"hd":false,"ddd":0,"bm":0,"hasMask":false,"ao":0,"ks":{"a":{"a":0,"k":[-4.312,-5.812,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6},"sk":{"a":0,"k":0},"p":{"a":0,"k":[50,50,0],"ix":2},"r":{"a":0,"k":0,"ix":10},"sa":{"a":0,"k":0},"o":{"a":1,"k":[{"o":{"x":0.167,"y":0.167},"i":{"x":0.833,"y":0.833},"s":[0],"t":0},{"o":{"x":0.167,"y":0.167},"i":{"x":0.833,"y":0.833},"s":[100],"t":60},{"s":[0],"t":119}],"ix":11}},"ef":[],"shapes":[{"ty":"gr","bm":0,"hd":false,"mn":"ADBE Vector Group","nm":"æ¤­å 1","ix":1,"cix":2,"np":3,"it":[{"ty":"el","bm":0,"hd":false,"mn":"ADBE Vector Shape - Ellipse","nm":"æ¤­åè·¯å¾ 1","d":1,"p":{"a":0,"k":[0,0],"ix":3},"s":{"a":0,"k":[90,90],"ix":2}},{"ty":"st","bm":0,"hd":false,"mn":"ADBE Vector Graphic - Stroke","nm":"æè¾¹ 1","lc":2,"lj":1,"ml":4,"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":10,"ix":5},"c":{"a":0,"k":[1,1,1],"ix":3}},{"ty":"tr","a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"sk":{"a":0,"k":0,"ix":4},"p":{"a":0,"k":[-4.312,-5.812],"ix":2},"r":{"a":0,"k":0,"ix":6},"sa":{"a":0,"k":0,"ix":5},"o":{"a":0,"k":100,"ix":7}}]},{"ty":"tm","bm":0,"hd":false,"mn":"ADBE Vector Filter - Trim","nm":"ä¿®åªè·¯å¾ 1","ix":2,"e":{"a":1,"k":[{"o":{"x":0.167,"y":0.167},"i":{"x":0.833,"y":0.833},"s":[2],"t":0},{"o":{"x":0.167,"y":0.167},"i":{"x":0.833,"y":0.833},"s":[80],"t":90},{"s":[1],"t":119}],"ix":2},"o":{"a":1,"k":[{"o":{"x":0.167,"y":0.167},"i":{"x":0.833,"y":0.833},"s":[0],"t":0},{"o":{"x":0.167,"y":0.167},"i":{"x":0.833,"y":0.833},"s":[360],"t":90},{"s":[720],"t":119}],"ix":3},"s":{"a":0,"k":0,"ix":1},"m":1}],"ind":1},{"ty":4,"nm":"upload","sr":1,"st":0,"op":120,"ip":0,"hd":false,"ddd":0,"bm":0,"hasMask":false,"ao":0,"ks":{"a":{"a":0,"k":[50,49.722,0],"ix":1},"s":{"a":0,"k":[80,80,100],"ix":6},"sk":{"a":0,"k":0},"p":{"a":1,"k":[{"o":{"x":0.167,"y":0.167},"i":{"x":0.833,"y":0.833},"s":[50,57.9,0],"t":0,"ti":[0,0,0],"to":[0,-2.5,0]},{"o":{"x":0.167,"y":0.167},"i":{"x":0.833,"y":0.833},"s":[50,42.9,0],"t":60,"ti":[0,-2.5,0],"to":[0,0,0]},{"s":[50,57.9,0],"t":119}],"ix":2},"r":{"a":0,"k":0,"ix":10},"sa":{"a":0,"k":0},"o":{"a":0,"k":100,"ix":11}},"ef":[],"shapes":[{"ty":"gr","bm":0,"hd":false,"mn":"ADBE Vector Group","nm":"ç» 1","ix":1,"cix":2,"np":2,"it":[{"ty":"sh","bm":0,"hd":false,"mn":"ADBE Vector Shape - Group","nm":"è·¯å¾ 1","ix":1,"d":1,"ks":{"a":0,"k":{"c":false,"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[50,31],[50,71]]},"ix":2}},{"ty":"st","bm":0,"hd":false,"mn":"ADBE Vector Graphic - Stroke","nm":"æè¾¹ 1","lc":2,"lj":1,"ml":10,"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":10,"ix":5},"c":{"a":0,"k":[1,1,1],"ix":3}},{"ty":"tr","a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"sk":{"a":0,"k":0,"ix":4},"p":{"a":0,"k":[0,0],"ix":2},"r":{"a":0,"k":0,"ix":6},"sa":{"a":0,"k":0,"ix":5},"o":{"a":0,"k":100,"ix":7}}]},{"ty":"gr","bm":0,"hd":false,"mn":"ADBE Vector Group","nm":"ç» 2","ix":2,"cix":2,"np":2,"it":[{"ty":"sh","bm":0,"hd":false,"mn":"ADBE Vector Shape - Group","nm":"è·¯å¾ 1","ix":1,"d":1,"ks":{"a":0,"k":{"c":false,"i":[[0,0],[0,0],[-0.391,-0.391],[0,0]],"o":[[0,0],[0.391,-0.391],[0,0],[0,0]],"v":[[-16.971,8.327],[-0.707,-7.936],[0.707,-7.936],[16.971,8.327]]},"ix":2}},{"ty":"st","bm":0,"hd":false,"mn":"ADBE Vector Graphic - Stroke","nm":"æè¾¹ 1","lc":2,"lj":1,"ml":10,"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":10,"ix":5},"c":{"a":0,"k":[1,1,1],"ix":3}},{"ty":"tr","a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"sk":{"a":0,"k":0,"ix":4},"p":{"a":0,"k":[50,36.673],"ix":2},"r":{"a":0,"k":0,"ix":6},"sa":{"a":0,"k":0,"ix":5},"o":{"a":0,"k":100,"ix":7}}]}],"ind":2}],"v":"5.4.3","fr":30,"op":120,"ip":0,"assets":[]}}
                    loop={true}
                  />
                </div>
              </div>
            </div>
            }
            </>
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