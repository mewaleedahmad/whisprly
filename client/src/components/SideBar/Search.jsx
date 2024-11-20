import { GoSearch } from "react-icons/go";
const Search = () => {
  return (
    <div className="w-full p-4">
      <label className="input input-bordered flex items-center  bg-secondary border borderColor">
        <input type="text" className="grow" placeholder="Add Friends" />
        <button>
          <GoSearch />
        </button>
      </label>
    </div>
  );
};

export default Search;
