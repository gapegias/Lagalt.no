import { NavLink } from "react-router-dom"
import { STORAGE_KEY_USER_PROFILE } from "../../const/storageKeys"
import { storageRead, storageSave } from "../../utils/storage"
import { useUserProfile } from '../../context/UserProfileContext'
import { userByName } from "../../api/user"
import { useState } from "react"

const ValuesListItem = ({ value, tagName }) => {

    const { setUserProfile } = useUserProfile()
    const [error, setError] =useState(null)

    const onNavigateToProfile = async () => {
        console.log(value)
        const [error, response] = await userByName(value)
        if(error !== null){
            setError("Action failed. Failed to retrieve user data from database")
            return
        }
        storageSave(STORAGE_KEY_USER_PROFILE, response)
        setUserProfile(storageRead(STORAGE_KEY_USER_PROFILE))
    }

    return (
        <>
            <li key={value + "li"}>
                {tagName === 'Skills' && <div key={value + "div"} className='Values-item'>
                    {value}
                </div>}
                {tagName === 'Members' &&
                    <NavLink onClick={onNavigateToProfile} to='/profile' style={{ textDecoration: 'none', color: '#0C0C1E' }}>
                        <div key={value + "div"} className='Values-item'>
                            {value}
                        </div>
                    </NavLink>}
            </li>
            {error !== null && <div>{error}</div>}
        </>

    )
}
export default ValuesListItem