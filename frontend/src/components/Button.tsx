interface ButtonProps{
  text: string,
  bgColor?: string,
  wFull?: boolean,
  onClickFn?: (T: any) => Promise<any> 
  cursorAllowed?: boolean
  btnDisabled?: boolean
}

function Button({text, bgColor, wFull, onClickFn, cursorAllowed, btnDisabled}: ButtonProps) {
  return (
    <button className={`${wFull ? 'w-full' : 'w-fit'} px-5 py-2 rounded-4xl text-xl ${cursorAllowed ? "cursor-pointer" : "cursor-not-allowed"} text-center`}
    style={{backgroundColor: bgColor ? `#${bgColor}` : '#5769A9'}}
    onClick={onClickFn}
    disabled={btnDisabled ? true : false}
    >
        {text}
    </button>
  )
}

export default Button