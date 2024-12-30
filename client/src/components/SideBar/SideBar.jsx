import Message from "./Message"
import Profile from "./Profile"
import Search from "./Search"
import Friends from "./Friends"

const SideBar = () => {
  return (
    <div className=" w-screen flex flex-col h-full lg:w-[24vw] border-r overflow-hidden  borderColor">
    <Profile/>
    <Search/>
    <Friends/>
    <h2 className="mb-3 px-6 mt-2 lg:mt-1">Messages</h2>
    <div className="flex-grow overflow-y-auto  hidden-scrollable-div pb-2 mb-4 ">
    <Message/>
    </div>
    </div>
  )
}

export default SideBar