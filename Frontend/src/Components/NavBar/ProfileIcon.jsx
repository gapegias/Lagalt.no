import { NavLink } from 'react-router-dom'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { useUser } from '../../context/UserContext'
import { useUserProfile } from '../../context/UserProfileContext'
import keycloak from '../../keycloak'
import { ROLES } from '../../const/roles'
const ProfileIcon = () => {
    const { user } = useUser()
    const { setUserProfile } = useUserProfile()
    const onProfile = () => {
        setUserProfile(user)
    }
    return (
        <>
            <NavLink onClick={onProfile} className='Profile-button-box' to='/profile'>
                <AccountCircleIcon sx={{ fontSize: 60 }} />
                {keycloak.hasRealmRole(ROLES.User) && <div className='Profile-name'>{keycloak.tokenParsed.preferred_username}</div>}
                {!keycloak.hasRealmRole(ROLES.User) && <div className='Profile-name'>Guest</div>}
            </NavLink>
        </>
    )
}
export default ProfileIcon