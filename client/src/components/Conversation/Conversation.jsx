import useGlobalState from "../../zustand/useGlobalState";
import ConversationContainer from "./ConversationContainer";
import NoChatSelected from "./NoChatSelected";
import SendMessage from "./SendMessage";
import User from "./User";

const Conversation = () => {
  const {selectedConversation} = useGlobalState();
 
  return (
    <section className={`w-full h-full ${selectedConversation === null ? "hidden" : ""} lg:flex lg:flex-col lg:w-[50vw]`}>
      {selectedConversation === null ? (
        <NoChatSelected />
      ) : (
        <div className="w-screen h-full absolute top-0 left-0 z-50 flex flex-col bg-primary lg:relative lg:bg-transparent lg:z-0  lg:w-[50vw]">
          <User />
          <div className="flex-grow overflow-y-auto scrollable-div">
            <ConversationContainer   />
          </div>
          <div className="flex-shrink-0">
            <SendMessage />
          </div>
        </div>
      )}
    </section>
  );
};

export default Conversation;
