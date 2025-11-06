import Button from "./Button"

interface BenefitProps{
    image: string,
    topHeading: string,
    mainHeading: string,
    bodyText: string,
    btnText: string,
    reverse: boolean
}

function Benefit({image, topHeading, mainHeading, bodyText, btnText, reverse}: BenefitProps) {
  return (
    <div className={`mt-20 text-white flex justify-center font-[outfit] ${reverse ? "flex-row-reverse" : ""}`}>
        <div className="w-1/2 flex items-center justify-center">
            <img src={image} alt="" className="w-60" />
        </div>
        <div className="w-1/2 flex flex-col p-10 gap-5">
            <h2 className="tracking-[8px]">{topHeading}</h2>
            <h1 className="text-5xl font-bold">{mainHeading}</h1>
            <h2 className="font-semibold text-xl">{bodyText}</h2>
            <Button text={btnText} />
        </div>
    </div>
  )
}

export default Benefit