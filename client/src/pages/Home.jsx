import SideBar from "../components/SideBar/SideBar";
import Conversation from "../components/Conversation/Conversation"

const Home = () => {
  return (
     <div className=" w-full h-screen flex items-center justify-center background-blur    ">
     <div className="flex h-full  lg:h-[85vh] lg:rounded-xl bg-primary bg-opacity-50 ">
     <SideBar/>
     <Conversation/>
     </div>
     </div>
  );
};

export default Home;
