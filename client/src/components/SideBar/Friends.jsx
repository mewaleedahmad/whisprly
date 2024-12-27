import { useEffect, useState } from "react";
import useGetFriends from "../../hooks/useGetFriends";

const Friends = () => {
  const online = true;
  const [loading,setLoading] = useState(false);
  const [friends, setFriends] = useState([]);
  const { getFriends } = useGetFriends();

  useEffect(() => {
    const handleFriends = async () => {
        const data = await getFriends();
        setFriends(data);
        setLoading(true);
    };

    handleFriends();
  },[]);
  
  const truncateName = (name, maxLength) => {
    return name.length > maxLength ? `${name.slice(0, maxLength)}...` : name;
  };

  return (
    <div className="w-full px-5">
      <h2 className="px-1">All Friends</h2>
      <div className="flex gap-5  pt-4 pb-3  overflow-x-auto  scrollable-div items-center">
      {!loading ? (<span className="loading loading-spinner pt-4 pb-3"></span>) : 
       <>
       {!friends.message  ? ( friends.friends.map((users)=> (
            <div key={users._id} className="Friend cursor-pointer">
              <div className={`avatar ${online ? "online" : ""} `}>
                <div className="w-14 rounded-full">
                  <img src={users.profilePic} />
                </div>
              </div>
              <h5 className="text-center text-nowrap max-w-14">{truncateName(users.fullName,9)}</h5>
            </div>
          ))) : <h5 className="text-base ps-2 pb-3 pt-2">No Friends</h5>
        } 
       </>
      }
      </div>
    </div>
  );
};

export default Friends;
