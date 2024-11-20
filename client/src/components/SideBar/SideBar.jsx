import Messages from "./Messages"
import Profile from "./Profile"
import Search from "./Search"
import Friends from "./Friends"

const SideBar = () => {
  return (
    <div className=" w-screen md:w-[25vw] border-r borderColor">
    <Profile/>
    <Search/>
    <Friends/>
    <Messages/>
    </div>
  )
}

export default SideBar