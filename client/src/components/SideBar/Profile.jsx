import { TbMenuDeep } from "react-icons/tb";
import { BiLogOut  } from "react-icons/bi";
import { FaUserTie } from "react-icons/fa6";
import { Link } from "react-router-dom";
import {useMobile} from "../../hooks/useMobile.js"
const Profile = () => {
  const isMobile = useMobile();
  return (
    <div className="w-full flex items-center justify-between p-5  border-b borderColor">
      <div className="flex gap-2">
      <div className="avatar">
        <div className="w-12 rounded-full">
          <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div>
      <div className="name">
        <h2 className="">Waleed Ahmad</h2>
        <Link to={"/profile"} ><h5 className="hover:underline">My Account</h5></Link>
      </div>
      </div>
      <div className={`dropdown ${isMobile ? "dropdown-left": "dropdown"} `}>
         <div tabIndex={0} role="button" className="btn bg-primary hover:bg-secondary  border-0 text-2xl "><TbMenuDeep/></div>
           <ul tabIndex={0} className="dropdown-content menu  bg-secondary rounded-md z-[1]   shadow">
            <li><Link to={"/profile"}><FaUserTie/>Profile</Link></li>
            <li><Link to={"/logout"}><BiLogOut />Logout</Link></li>
           </ul>
      </div>
    </div>
  );
};

export default Profile;
