import Button from "./Button"
import earth from "../assets/earth.png"

function LandingBody() {
  return (
    <div className="text-white font-[outfit] flex justify-center items-center mt-15">
        <div className="w-1/2 flex flex-col gap-5"> 
            <h1 className="font-bold text-6xl">Connect to the World</h1>
            <h2 className="text-2xl font-semibold w-3/4 mb-5">Loner is a social media platform where you meet strangers who you can talk to</h2>
            <Button text={"Explore"} />
        </div>
        <div className="w-1/2 flex flex-col">
            <img src={earth} alt="" className="w-120 self-end" />
        </div>
    </div>
  )
}

export default LandingBody