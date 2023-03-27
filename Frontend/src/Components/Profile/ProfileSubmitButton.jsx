import { useState } from 'react'
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
    const [error, setError] = useState(null)


    const onSubmit = async () => {
        const [errorUsers, users] = await findAllUsers()
        if(errorUsers !== null){
            setError('Failed to retrieve users data from database.')
            return
        }
        if (users.filter(us => us.user_name !== user.user_name).some(u => u.user_name === updatedUser.user_name)) {
            alert('This username is already exists. Please chose another one!')
        }
        else {
            const [error, response] = await updateUser(updatedUser.user_id, updatedUser)
            if (error !== null){
                setError("Action failed. User is not updated.")
                return
            }
            const [errorUser, responseUser] = await userByName(updatedUser.user_name)
            if (errorUser !== null){
                setError("Action failed. Failed to retrieve users data from database.")
                return
            }
            storageSave(STORAGE_KEY_USER, updatedUser)
            setUser(updatedUser)
            storageSave(STORAGE_KEY_USER_PROFILE, updatedUser)
            setUserProfile(updatedUser)
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
            {error !== null && <div>{error}</div>}
        </>
    )
}
export default ProfileSubmitButton