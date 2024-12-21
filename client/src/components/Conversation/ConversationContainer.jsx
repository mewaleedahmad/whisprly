/* eslint-disable react/prop-types */

const ConversationContainer = ({message}) => {
  return (
    <div className="w-full py-2 h-full">
      <section className="px-5 py-6 flex scrollable-div flex-col gap-4">

        <div className="message-received ">
          <div className="chat chat-start">
            <div className="chat-image avatar">
              <div className="w-11 rounded-full">
                <img alt="Tailwind CSS chat bubble component" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"/>
              </div>
            </div>
            <div className="chat-bubble text-gray-100 bg-secondary ">
            What are you doing ?
            </div>
          </div>
        </div>

        {message.map((msg,i)=>(
          <div key={i} className="message-sent">
          <div className="chat chat-end">
            <div className="chat-image avatar">
              <div className="w-11 rounded-full">
                <img alt="Tailwind CSS chat bubble component" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <div className="chat-bubble text-gray-100 bg-violet-900">
             {msg}
            </div>
          </div>
        </div>
        ))}
       
      </section>
    </div>
  );
};

export default ConversationContainer;
