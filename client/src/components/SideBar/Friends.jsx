
const Friends = () => {
  const online = true
  return (
    <div className="w-full px-5">
      <h2 className="px-1">All Friends</h2>
      <div className="flex gap-5  pt-4 pb-3  overflow-x-auto  scrollable-div items-center">
        <div className="Friend cursor-pointer">
        <div className={`avatar ${online ? "online": ""} `}>
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
