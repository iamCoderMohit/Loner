import search from "../assets/search-interface-symbol.png"

function Footer() {
  return (
    <div className="font-[outfit] text-white flex mt-20 justify-around mb-5">
        <div className="font-semibold">LONER</div>
        <div className="flex flex-col items-start">
            <button className="mb-3">Market</button>
            <button>Home</button>
            <button>About</button>
            <button>Create Ac.</button>
        </div>
        <div className="flex flex-col items-start">
            <button className="mb-3">Contact</button>
            <button>Home</button>
            <button>About</button>
            <button>Create Ac.</button>
        </div>
        <div className="flex flex-col items-start">
            <button className="mb-3">Join our Newsletter</button>
            <div className="flex border border-white rounded-2xl">
                <input type="text" className="outline-none rounded-2xl w-50 border-r-0 p-2" />
                <div className="rounded-2xl p-2 border-l-0"><img src={search} alt="" className="invert w-6"/></div>
            </div>
        </div>
    </div>
  )
}

export default Footer