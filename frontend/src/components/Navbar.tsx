import { Link } from "react-router-dom"

function Navbar() {
  return (
    <div className="text-white font-[outfit] flex justify-between items-center h-20">
        <div className="text-3xl font-bold cursor-pointer">LONER</div>
        <div className="flex gap-10 text-xl">
            <div className="cursor-pointer">About</div>
            <div className="cursor-pointer">Contact</div>
            <div className="cursor-pointer">Pricing</div>
            <div className="cursor-pointer"><Link to={"/signin"}>Signin</Link></div>
        </div>
    </div>
  )
}

export default Navbar