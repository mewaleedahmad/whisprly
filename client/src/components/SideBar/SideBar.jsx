import Messages from "./Messages"
import Profile from "./Profile"
import Search from "./Search"
import Friends from "./Friends"

const SideBar = () => {
  return (
    <div className=" w-screen h-full lg:w-[23vw] border-r overflow-y-scroll  borderColor">
    <Profile/>
    <Search/>
    <Friends/>
    <Messages/>
    </div>
  )
}

export default SideBar