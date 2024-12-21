import ConversationContainer from "./ConversationContainer"
import SendMessage from "./SendMessage"
import User from "./User"
import NoChatSelected from "./NoChatSelected";

const Conversation = () => {
  const noChatSelected = false

  return (
    <section className="w-screen h-full hidden lg:flex lg:flex-col lg:w-[50vw]" >
      {noChatSelected ? <NoChatSelected/> :
      <div className="w-screen h-full hidden lg:flex lg:flex-col lg:w-[50vw]">
          <User />
        <div className="flex-grow overflow-y-auto scrollable-div">
          <ConversationContainer  />
        </div>
        <div className="flex-shrink-0">
          <SendMessage/>
        </div>
    </div>
      }
    </section>
  );
};

export default Conversation;
