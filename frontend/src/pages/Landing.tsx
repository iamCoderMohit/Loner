import Benefit from "../components/Benefit"
import BlurCircle from "../components/BlurCircle"
import FeaturedOn from "../components/FeaturedOn"
import LandingBody from "../components/LandingBody"
import Navbar from "../components/Navbar"
import benefit from "../assets/benefit.png"
import ui from "../assets/user-interface.png"
import Testimonials from "../components/Testimonials"
import FootCard from "../components/FootCard"
import Footer from "../components/Footer"

function Landing() {
  return (
    <div className="flex justify-center bg-[#09021B] w-full overflow-x-hidden">
        <div className="w-[1125px] relative">
            <Navbar />
            <LandingBody />
            <FeaturedOn />
            <div className="absolute top-[-200px]">
                <BlurCircle color="5E59F1" />
            </div>
            <div className="absolute top-[200px] -right-10">
                <BlurCircle color="5E59F1" />
            </div>
            <Benefit image={benefit} topHeading="GLOBAL REACH" mainHeading="Worldwide Users" bodyText="We have users from all over the world so you can find and have fun with’em" btnText="FIND NEW FRIENDS" reverse={false}/>
            <Benefit image={ui} topHeading="SIMPLE INTERFACE" mainHeading="Easy to Use" bodyText="No complicated UI, give updates to friends quickly" btnText="LET'S EXPLORE" reverse={true}/>
            <Testimonials />
            <FootCard />
            <Footer />
        </div>
    </div>
  )
}

export default Landing