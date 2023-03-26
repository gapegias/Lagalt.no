import { userByName, updateUser, findAllUsers } from '../../api/user'
import { STORAGE_KEY_USER, STORAGE_KEY_USER_PROFILE } from '../../const/storageKeys'
import { useEditMode } from '../../context/EditMode'
import { useUser } from '../../context/UserContext'
import { useUserProfile } from '../../context/UserProfileContext'
import { storageSave } from '../../utils/storage'

const ProfileSubmitButton = ({ updatedUser }) => {

    const { user, setUser } = useUser()
    const { userProfile, setUserProfile } = useUserProfile()
    const { editMode, setEditMode } = useEditMode()


    const onSubmit = async () => {
        const [errorUsers, users] = await findAllUsers()
        if (users.filter(us => us.user_name !== user.user_name).some(u => u.user_name === updatedUser.user_name)) {
            alert('This username is already exists. Please chose another one!')
        }
        else {
            const [error, response] = await updateUser(updatedUser.user_id, updatedUser)
            const [errorUser, responseUser] = await userByName(updatedUser.user_name)
            storageSave(STORAGE_KEY_USER, responseUser)
            storageSave(STORAGE_KEY_USER_PROFILE, responseUser)
            setUser(responseUser)
            setUserProfile(responseUser)
            setEditMode(false)
        }

    }

    const onCancel = () => {
        setEditMode(false)
    }

    return (
        <>
            <div className="button-bottom-box">
                <button className='button-29' type='submit' onClick={onSubmit}>Submit</button>
                <button className='button-29' type='submit' onClick={onCancel}>Cancel</button>
            </div>
        </>
    )
}
export default ProfileSubmitButton