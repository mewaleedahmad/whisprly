import { Link } from "react-router-dom"

const Logo = () => {
  return (
    <div>
        <Link to="/" className=" text-2xl absolute top-5 left-1 lg:left-3 mx-4 flex items-center gap-1">
          <img src="/favicon.png" className="size-9 " />
          <p className="font-bold animated-gradient">Whisprly</p>
        </Link>
    </div>
  )
}

export default Logo