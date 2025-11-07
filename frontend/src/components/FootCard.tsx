import Button from "./Button"

function FootCard() {
  return (
    <div className="font-[outfit] text-white mt-20 rounded-2xl bg-linear-to-r from-[#69DEE0] to-[#441187] flex flex-col items-center justify-center p-5 gap-5">
        <h1 className="text-black tracking-[8px] text-center text-2xl font-semibold">ARE YOU READY?</h1>
        <h1 className="text-center text-5xl font-bold w-1/3">Be the part of next big thing</h1>
        <Button text="GET STARTED" bgColor="000000"/>
    </div>
  )
}

export default FootCard