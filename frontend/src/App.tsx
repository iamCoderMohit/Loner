import { BrowserRouter, Route, Routes } from "react-router-dom"
import Landing from "./pages/Landing"
import Signin from "./pages/Signin"
import Feed from "./pages/Feed"
import SetUsername from "./pages/SetUsername"
import SetPP from "./pages/setPP"
import SetBio from "./pages/SetBio"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/setusername" element={<SetUsername />} />
        <Route path="/setpp" element={<SetPP />} />
        <Route path="/setbio" element={<SetBio />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App