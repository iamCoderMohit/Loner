import chat from "../assets/chat.png"

function Feed() {
  return (
    <div className="font-[outfit] text-white bg-[#09021B] flex justify-center">
        <div className="w-[555px]">
            <div className="flex justify-between items-center py-3">
                <h1 className="tracking-[8px] text-lg cursor-pointer">LONER</h1>
                <img src={chat} alt="" className="invert w-7 cursor-pointer"/>
            </div>
        </div>
    </div>
  )
}

export default Feed