import { TiMessages } from "react-icons/ti";
import { useAuthContext } from "../../context/AuthContext";

const NoChatSelected = () => {
  const {authUser} = useAuthContext()
  return (
    <div className="w-full h-full hidden lg:flex  items-center justify-center">
      <div className="flex flex-col text-2xl text-gray-300 font-semibold gap-2 justify-center items-center">
        <p>Welcome 👋 {authUser.fullName}</p>
        <p className="text-gray-300 text-3xl">
          Select a Friend to start Conversation
        </p>
        <TiMessages className="size-16  text-gray-300" />
      </div>
    </div>
  );
};

export default NoChatSelected;
