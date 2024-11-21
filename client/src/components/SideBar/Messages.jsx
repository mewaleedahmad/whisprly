import Message from "./Message";

const Messages = () => {
  return (
    <div className="w-full h-[90%] lg:h-[50%] overflow-hidden">
      <h2 className="mb-3 px-6">Messages</h2>
      <div className="h-[50%] lg:h-full  overflow-y-scroll scrollable-div pb-12">
        <Message />
        <Message />
        <Message />    
      </div>
    </div>
  );
};

export default Messages;
