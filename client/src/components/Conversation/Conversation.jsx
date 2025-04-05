import useGlobalState from "../../zustand/useGlobalState";
import ConversationContainer from "./ConversationContainer";
import NoChatSelected from "./NoChatSelected";
import SendMessage from "./SendMessage";
import User from "./User";

const Conversation = () => {
  const {selectedConversation} = useGlobalState();

  return (
    <section className={`w-full h-full  ${selectedConversation === null ? "hidden" : ""} xl:flex xl:flex-col xl:w-[50vw]`}>
      {selectedConversation === null ? (
        <NoChatSelected />
      ) : (
        <div className="w-screen bg-[#151419]   backdrop-blur-3xl  h-full absolute top-0 left-0 z-50 flex flex-col xl:backdrop-blur-none  xl:relative xl:bg-transparent xl:z-0  xl:w-[50vw]">
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
