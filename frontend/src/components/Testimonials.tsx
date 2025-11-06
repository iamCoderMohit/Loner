import ReviewCard from "./ReviewCard"
import user from "../assets/random1.jfif"

function Testimonials() {
  return (
    <div className="font-[outfit] text-white mt-20">
        <h1 className="tracking-[8px] text-center text-2xl">TESTIMONIALS</h1>
        <h1 className="text-4xl font-bold text-center leading-tight">What our users say</h1>

        <div className="flex gap-5 mt-25">
            <ReviewCard image={user}  name="OLIVIA COLE" text="This app is the best when we talk about something new in social media apps"/>
            <ReviewCard image={user}  name="OLIVIA COLE" text="This app is the best when we talk about something new in social media apps"/>
            <ReviewCard image={user}  name="OLIVIA COLE" text="This app is the best when we talk about something new in social media apps"/>
        </div>
    </div>
  )
}

export default Testimonials