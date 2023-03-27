import { useUser } from '../../context/UserContext'
import { useUserProfile } from '../../context/UserProfileContext'
import './ProfileForm.css'

import ValuesSet from './ValuesSet'
const ProfileForm = () => {

    const { user, setUser } = useUser()
    const { userProfile, setUserProfile } = useUserProfile()
    const skillNames = userProfile.skills.map((skill) => skill.skill_name)

    const hideInfo = () => {
        if ((user.user_name !== userProfile.user_name) && (userProfile.user_hide)) {
            return false
        }
        return true
    }

    return (
        <>
            <div className='Project-form-box'>
                <div className='Name-box'>
                    <h2>{userProfile.user_name} </h2>
                </div>
                <div className='Body-box'>
                    <div className='About-me-box'>
                        <h3>About me</h3>
                        <p>{userProfile.user_about_me}</p>
                    </div>
                    <div className='Skills-box'>
                        {hideInfo() && <ValuesSet values={skillNames} tagName="Skills" />}
                    </div>
                </div>
            </div>
        </>
    )
}
export default ProfileForm