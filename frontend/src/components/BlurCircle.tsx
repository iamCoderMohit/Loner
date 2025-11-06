function BlurCircle({color}: {color: string}) {
  return (
    <div className={`w-100 h-100 bg-[#${color}]/50 rounded-full absolute blur-3xl`}>
    </div>
  )
}

export default BlurCircle