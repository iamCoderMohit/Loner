interface CardProps{
    image: string,
    name: string,
    text: string
}

function ReviewCard({image, name, text}: CardProps) {
  return (
    <div className="text-white font-[outfit] w-1/3 h-55 bg-[#10164E] relative rounded-2xl py-4">
        <div className={`h-30 w-30 rounded-full bg-green-500 absolute -top-15 -translate-x-1/2 left-1/2 bg-cover bg-center`}
        style={{backgroundImage: image ? `url(${image})`: "none"}}
        ></div>

       <div className="absolute top-15 left-1/2 -translate-x-1/2 w-full p-3">
         <h1 className="text-center tracking-[8px]">{name}</h1>

        <h1 className="text-center mt-5 text-xl">{text}</h1>
       </div>
    </div>
  )
}

export default ReviewCard