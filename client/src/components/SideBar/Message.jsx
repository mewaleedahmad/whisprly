const Message = () => {
  const online = true
  return (
    <div className="w-full flex items-center justify-between py-2 px-6 cursor-pointer hover:bg-secondary">
      <div className="flex gap-3 items-center">
        <div className={`avatar ${online ? "online": ""}`}>
          <div className="w-12 rounded-full">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </div>
        </div>
        <div className="name">
          <h3>Waleed Ahmad</h3>
          <h5>Where are you ?</h5>
        </div>
      </div>
      <h5 className="text-xs">8:40 PM</h5>
    </div>
  );
};

export default Message;
