import { GoSearch } from "react-icons/go";
import { MdPersonAddAlt } from "react-icons/md";
import { CgUserRemove } from "react-icons/cg";

import useGetUsers from "../../hooks/useGetUsers";
import useSendFriendReq from "../../hooks/useSendFriendReq";
import useRemoveFriend from "../../hooks/useRemoveFriend";

import { useState } from "react";

const Search = () => {
  const { getUsers } = useGetUsers();
  const { removeFriend } = useRemoveFriend()
  const {sendFriendReq}= useSendFriendReq()

  const [searchText, setSearchText] = useState("");
  const [users, setUsers] = useState([]);

  const alreadyFriend = false;

  const handleInputChange = (e) => {
    const sanitizedInput = e.target.value.toLowerCase().replace(/\s+/g, "");
    setSearchText(sanitizedInput);
  };

  const filteredUsers = users.filter((user) =>
    user.userName.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleSubmit = async () => {
    const data = await getUsers();
    setUsers(data);
  };

  const handleSendReq = async (id) => {
    await sendFriendReq(id);
  };

  const handleRemoveFriend = async (id) => {
    await removeFriend(id);
  }
  
  return (
    <div className="relative w-full p-4 my-2">
      <label className="input input-bordered flex items-center bg-transparent border borderColor">
        <input
          type="search"
          className="grow text-gray-300 bg-transparent focus:outline-none"
          placeholder="Search by username"
          value={searchText}
          onChange={handleInputChange}
          onClick={handleSubmit}
        />
        <button className="pl-3 text-gray-300 cursor-default hover:text-gray-50">
          <GoSearch />
        </button>
      </label>

      {searchText && (
        <div className="absolute overflow-auto max-h-[50vh] scrollable-div left-0 right-0 mt-2 py-1 mx-3 bg-primary border border-gray-600 rounded-md shadow-lg z-50">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <div
                key={user._id}
                className="w-full flex items-center  justify-between py-2 px-4 cursor-default hover:bg-transparent"
              >
                <div className="flex gap-3 items-center">
                  <div className={`avatar`}>
                    <div className="w-10 rounded-full">
                      <img src={user.profilePic} />
                    </div>
                  </div>
                  <div className="-space-y-1">
                    <h2>{user.fullName}</h2>
                    <h5 className=" text-[11px] ps-1">{user.userName}</h5>
                  </div>
                </div>

                <dialog id="removeFriend" className="modal ">
                  <div className="modal-box py-6 absolute top-24 lg:relative lg:top-0  bg-secondary w-full lg:w-[450px] lg:max-w-[500px] rounded-xl shadow-lg p-3">
                    <form method="dialog">
                      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                        ✕
                      </button>
                    </form>
                    <h3 className="p-2 pt-8 text-lg ">Are you sure you want to remove this friend ?</h3>
                    <div className="flex justify-center gap-2 pt-2">
                      <form method="dialog">
                      <button className="text-sm hover:bg-gray-800 bg-gray-700 text-gray-200 rounded-md px-3 py-1">
                        Cancel
                      </button>
                      </form>
                     <form method="dialog">
                     <button onClick={()=>handleRemoveFriend(user._id)} className="text-sm hover:bg-red-800 bg-red-700 text-gray-200 rounded-md px-3 py-1">
                        Remove
                      </button>
                     </form>
                    </div>
                  </div>
                </dialog>

                {alreadyFriend ? (
                  <button
                    onClick={() =>
                      document.getElementById("removeFriend").showModal()
                    }
                    className="text-2xl text-red-500"
                  >
                    <CgUserRemove />
                  </button>
                ) : (
                  <button
                    onClick={() => handleSendReq(user._id)}
                    className="text-2xl text-blue-400"
                  >
                    <MdPersonAddAlt />
                  </button>
                )}
              </div>
            ))
          ) : (
            <div className="px-4 py-2 text-gray-400">No users found.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
