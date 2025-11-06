function Button({text}: {text: string}) {
  return (
    <div className="bg-[#5769A9] w-fit px-5 py-2 rounded-4xl text-xl cursor-pointer">
        {text}
    </div>
  )
}

export default Button