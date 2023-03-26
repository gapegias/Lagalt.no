import { useNavigate } from "react-router-dom"
import { STORAGE_KEY_USER } from "../../const/storageKeys"
import { useUser } from "../../context/UserContext"
import { storageDelete } from "../../utils/storage"

const LogoutButton = () => {
    const { user, setUser } = useUser()
    const navigate = useNavigate()

    const onLogout =  () => {
        navigate('/')
        storageDelete(STORAGE_KEY_USER)
        setUser(null) 
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