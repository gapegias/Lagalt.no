import { createContext, useContext, useState } from 'react'
import { STORAGE_KEY_USER_PROFILE } from '../const/storageKeys'
import { storageRead } from '../utils/storage'

// Context -> exposing
const UserProfileContext = createContext()

export const useUserProfile = () => {
    return useContext(UserProfileContext)
}

// Provider -> managing state
const UserProfileProvider = ({ children }) => {
    const [userProfile, setUserProfile] = useState(storageRead(STORAGE_KEY_USER_PROFILE))
    const state = {
        userProfile,
        setUserProfile
    }
    return (
        <UserProfileContext.Provider value={state}>
            {children}
        </UserProfileContext.Provider>
    )
}
export default UserProfileProvider