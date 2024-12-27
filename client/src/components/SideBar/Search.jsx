import { GoSearch } from "react-icons/go";
import { MdPersonAddAlt } from "react-icons/md";
import { CgUserRemove } from "react-icons/cg";

import useGetUsers from "../../hooks/useGetUsers";

import { useState } from "react";

const Search = () => {
  const [searchText, setSearchText] = useState("");
  const { getUsers } = useGetUsers();
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
                className="w-full flex items-center  justify-between py-2 px-4 cursor-default hover:bg-secondary"
              >
                <div className="flex gap-3 items-center">
                  <div className={`avatar`}>
                    <div className="w-10 rounded-full">
                      <img src={user.profilePic} />
                    </div>
                  </div>
                  <div className="-space-y-1">
                    <h2>{user.fullName}</h2>
                    <h5 className=" text-[11px]">{user.userName}</h5>
                  </div>
                </div>
                {alreadyFriend ? (
                  <button className="text-2xl text-red-500">
                    <CgUserRemove />
                  </button>
                ) : (
                  <button className="text-2xl">
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
