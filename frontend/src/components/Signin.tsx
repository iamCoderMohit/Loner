function Signin() {
    async function Signin() {
        window.location.href = "http://localhost:3000/api/v1/auth/signup";
        //navigate to home page after successfull login or signup
    }
  return (
    <div>
        <button onClick={Signin}>Signin</button>
    </div>
  )
}

export default Signin