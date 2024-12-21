import { GoSearch } from "react-icons/go";
const Search = () => {
  return (
    <div className="w-full p-4 my-2">
      <label className="input input-bordered flex items-center  bg-transparent border borderColor">
        <input type="search" className="grow text-gray-300 " placeholder="Search Users" />
        <button className="pl-3 text-gray-300 hover:text-gray-50">
          <GoSearch   />
        </button>
      </label>
    </div>
  );
};

export default Search;
