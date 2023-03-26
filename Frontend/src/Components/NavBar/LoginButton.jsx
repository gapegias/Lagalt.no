import { useNavigate } from "react-router"
import keycloak from "../../keycloak"


const LoginButton = () => {
    const navigate = useNavigate()

    const onLogin = async () => {
        navigate('/')
        keycloak.login()
    }



    return (
        <>
            <div className="button-box">
                <button onClick={onLogin} className="button-62">
                    <p>Login</p>
                </button>
            </div>
        </>
    )
}
export default LoginButton