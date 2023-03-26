import { NavLink } from 'react-router-dom'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import {useUser} from '../../context/UserContext'
import { useUserProfile } from '../../context/UserProfileContext'
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
                    {(user!==null) && <div className='Profile-name'>{user.user_name}</div>}
                    {(user===null) && <div className='Profile-name'>Guest</div>}
                </NavLink>
        </>
    )
}
export default ProfileIcon