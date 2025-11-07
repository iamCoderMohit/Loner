import { useMemo, useState } from "react";
import Button from "../components/Button";
import api from "../utils/apiInterceptor";
import debounce from "../utils/debounce";

function SetUsername() {
    const [isAvl, setIsAvl] = useState(true)

    async function checkUsername(username: string) {
        try {
          await api.post("/auth/check", {username})
          setIsAvl(true)
        } catch (error) {
          setIsAvl(false)
        }
    }

    const debouncedCheck = useMemo(() => debounce(checkUsername, 1000), [])

    async function setFinalUsername(username: string) {
        try {
            await api.put("/auth/username", {username})
        } catch (error) {
            console.error(error)
        }
    }

    const [username, setUsername] = useState("")

  return (
    <div className="font-[outfit] text-white bg-[#09021B] flex justify-center">
      <div className="w-[555px] h-screen">
        <h1 className="tracking-[8px] py-3">SET USERNAME</h1>

        <div className="flex flex-col gap-5 mt-40">
          <input
            type="text"
            className="border border-gray-600 rounded-lg w-full py-3 pl-3"
            placeholder="check availability"
            onChange={(e) => {
              const value = e.target.value
              setUsername(value)
              debouncedCheck(value)
            }}
          />

          {username ? <h1>{username} is {isAvl ? "available" : "not available"}</h1> : null}

          <div>
            <Button text="Set Username" wFull={true} onClickFn={() => setFinalUsername(username)} cursorAllowed={isAvl ? true : false} btnDisabled={isAvl ? false : true}/>
          </div>  
        </div>
      </div>
    </div>
  );
}

export default SetUsername;
