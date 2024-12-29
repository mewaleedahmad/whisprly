import { BsThreeDotsVertical } from "react-icons/bs";
import { LuUserMinus2 } from "react-icons/lu";

 const online = true
const User = () => {
  return (
    <div className="w-full flex items-center justify-between p-5  border-b borderColor">
     <div  className="flex  gap-4">
      <div className={`avatar ${online ? "online": ""}`}>
        <div className="w-12 rounded-full">
          <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div>
      <div className="name -space-y-1">
        <h2>Waleed Ahmad</h2>
        <h5 className="ps-1 ">waleed_gondal</h5>
      </div>
      </div>
     <div className="dropdown dropdown-bottom  dropdown-end">
       <div tabIndex={0} role="button" className="btn text-xl bg-transparent border-none "><BsThreeDotsVertical/></div>
        <ul tabIndex={0} className="dropdown-content menu bg-primary rounded-box z-[1] w-52 p-2 shadow">
         <li><button className="text-red-500 text-sm"><p>Remove Friend</p><LuUserMinus2/></button></li>
        </ul>
     </div>
    </div>
  );
};

export default User;
