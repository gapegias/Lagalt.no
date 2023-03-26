import { useNavigate } from "react-router-dom"
import keycloak from "../../keycloak"


const LogoutButton = () => {
    const navigate = useNavigate()

    const onLogout = () => {
        navigate('/')
        keycloak.logout()
        
    }

    return (
        <>
            <div className="button-box">
                <button onClick={onLogout} className="button-62">
                    <p>Logout</p>
                </button>
            </div>
        </>
    )
}
export default LogoutButton