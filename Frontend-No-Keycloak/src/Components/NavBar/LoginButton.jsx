import { useState } from "react"
import { useUser } from "../../context/UserContext"
import LoginForm from "./LoginForm"

const LoginButton = () => {

  

    const {user} = useUser()
    const [isPressed, setIsPressed] = useState(false)

    const onLogin=()=>{
        setIsPressed(true)
    }

    

    return (
        <>
            <div className="button-box">
                <button onClick={onLogin} className="button-62">
                    <p>Login</p>
                </button>
            </div>

            {user === null && isPressed && <LoginForm/>}
        </>
    )
}
export default LoginButton