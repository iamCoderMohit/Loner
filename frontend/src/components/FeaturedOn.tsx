import tc from "../assets/techcrunch.png"
import mit from "../assets/mit.png"
import forbes from "../assets/forbes.png"
import fast from "../assets/fast.png"

function FeaturedOn() {
  return (
    <div className="text-white font-[outfit] mt-20">
        <h1 className="text-2xl tracking-[8px] font-semibold">FEATURED ON</h1>
        <div className="bg-[#10164E] rounded-lg flex items-center justify-around mt-10">
            <img src={tc} alt="" className="invert brightness-0 w-30 h-30"/>
            <img src={mit} alt="" className="invert brightness-0 w-50 h-10"/>
            <img src={forbes} alt="" className="invert brightness-0 w-30 h-15"/>
            <img src={fast} alt="" className="invert brightness-0 w-40 h-10"/>
        </div>
    </div>
  )
}

export default FeaturedOn