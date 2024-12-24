import { GrLogout } from "react-icons/gr";

import { Link } from "react-router-dom";

import useLogout from "../../hooks/useLogout";

const Profile = () => {
  const { logout } = useLogout();
  return (
    <div className="w-full flex items-center justify-between p-5  border-b borderColor">
      <Link to="/profile" className="flex  gap-2">
        <div className="avatar">
          <div className="w-12 rounded-full">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </div>
        </div>
        <div className="name ">
          <h2>Waleed Ahmad</h2>
          <h5 className="ps-1 text-xs">waleed_gondal</h5>
        </div>
      </Link>
      <button
        onClick={logout}
        className="bg-transparent btn border-none text-lg"
      >
        <GrLogout />
      </button>
    </div>
  );
};

export default Profile;
