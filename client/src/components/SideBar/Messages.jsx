import Message from "./Message";

const Messages = () => {
  return (
    <div className="w-full h-full  mt-2 lg:mt-0  ">
      <h2 className="mb-3 px-6">Messages</h2>
      <div className="h-[55%] lg:h-[45vh] overflow-y-auto  scrollable-div pb-18">
        <Message />
      </div>
    </div>
  );
};

export default Messages;
