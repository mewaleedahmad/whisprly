import { useState } from "react";
import { GoSearch } from "react-icons/go";
import { MdPersonAddAlt } from "react-icons/md";
import { CgUserRemove } from "react-icons/cg";

const Search = () => {
  const [searchText, setSearchText] = useState("");
  const [users] = useState([
    "john doe",
    "jane smith",
    "waleed ahmad",
    "alice johnson",
  ]);
  const alreadyFriend = false;

  const filteredUsers = users.filter((user) =>
    user.toLowerCase().includes(searchText)
  );

  const handleInputChange = (e) => {
    const sanitizedInput = e.target.value.toLowerCase().replace(/\s+/g, "");
    setSearchText(sanitizedInput);
  };

  return (
    <form className="relative w-full p-4 my-2">
      <label className="input input-bordered flex items-center bg-transparent border borderColor">
        <input
          type="search"
          className="grow text-gray-300 bg-transparent focus:outline-none"
          placeholder="Search Users"
          value={searchText}
          onChange={handleInputChange}
        />
        <button className="pl-3 text-gray-300 hover:text-gray-50">
          <GoSearch />
        </button>
      </label>

      {searchText && (
        <div className="absolute left-0 right-0 mt-2 py-1 overflow-hidden mx-3 bg-primary border border-gray-600 rounded-md shadow-lg z-50">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user, index) => (
              <div
                key={index}
                className="w-full flex items-center justify-between py-2 px-4 cursor-default hover:bg-secondary"
              >
                <div className="flex gap-3 items-center">
                  <div className={`avatar`}>
                    <div className="w-10 rounded-full">
                      <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                    </div>
                  </div>
                  <div className="name">
                    <h3>{user}</h3>
                  </div>
                </div>
                {alreadyFriend ? (
                  <button className="text-xl text-red-500">
                    <CgUserRemove />
                  </button>
                ) : (
                  <button className="text-xl">
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
    </form>
  );
};

export default Search;
