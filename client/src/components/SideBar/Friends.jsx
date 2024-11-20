
const Friends = () => {
  const active = true
  return (
    <div className="w-full">
      <h2 className=" px-6 ">All Friends</h2>
      <div className="flex gap-5 px-4 pt-4 pb-3  overflow-x-scroll  scrollable-div items-center">
        <div className="Friend cursor-pointer">
        <div className={`avatar ${active ? "online": "offline"} `}>
          <div className="w-14 rounded-full">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </div>
        </div>
         <h5 className="text-center">Waleed</h5>
        </div>
        
       
      </div>
    </div>
  );
};

export default Friends;
