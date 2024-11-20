import SideBar from "../components/SideBar/SideBar";
import Conversation from "../components/Conversation/Conversation"

const Home = () => {
  return (
     <div className=" w-full h-screen flex items-center justify-center  ">
     <div className="flex h-screen sm:h-[85vh] rounded-xl overflow-hidden bg-primary">
     <SideBar/>
     <Conversation/>
     </div>
     </div>
  );
};

export default Home;
