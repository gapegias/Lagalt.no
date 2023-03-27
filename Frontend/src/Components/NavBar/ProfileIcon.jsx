import { NavLink } from 'react-router-dom'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import {useUser} from '../../context/UserContext'
import { useUserProfile } from '../../context/UserProfileContext'
import keycloak from '../../keycloak'
const ProfileIcon = () => {
    const { user, setUser} = useUser()
    const { userProfile, setUserProfile} = useUserProfile()
    const onProfile =()=>{
        setUserProfile(user)
    }
    return (
        <>
                <NavLink onClick={onProfile} className='Profile-button-box' to='/profile'>
                    <AccountCircleIcon sx={{ fontSize: 60 }}/>
                    {keycloak.authenticated && <div className='Profile-name'>{keycloak.tokenParsed.preferred_username}</div>}
                    {!keycloak.authenticated && <div className='Profile-name'>Guest</div>}
                </NavLink>
        </>
    )
}
export default ProfileIcon