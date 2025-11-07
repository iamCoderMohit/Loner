import google from "../assets/google.png"

function Signin() {
    async function handleSignin() {
        window.location.href = "http://localhost:3000/api/v1/auth/signup";
    }

  return (
    <div className="font-[outfit] text-white bg-[#09021B] h-screen flex justify-center">
        <div className="w-[555px]">
            <h1 className="text-2xl tracking-[8px] mt-5">SIGN IN</h1>
            <div className="flex items-center justify-center gap-5 bg-[#10164E] p-5 rounded-2xl cursor-pointer absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
            onClick={handleSignin}
            >
                <img src={google} className="w-10" alt="" />
                <h1 className="text-xl">Sign in with Google</h1>
            </div>
        </div>
    </div>
  )
}

export default Signin