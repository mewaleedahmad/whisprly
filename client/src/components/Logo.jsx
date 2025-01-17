import { Link } from "react-router-dom"

const Logo = () => {
  return (
    <div>
        <Link to="/" className=" text-xl absolute top-5 left-1 lg:left-3 mx-4 flex items-center gap-1">
          <img src="/favicon.png" className="size-8" />
          <p className="font-bold gradient-text">Whisprly</p>
        </Link>
    </div>
  )
}

export default Logo