import { createContext, useContext, useState } from 'react'
import { STORAGE_KEY_USER } from '../const/storageKeys'
import { storageRead } from '../utils/storage'

// Context -> exposing
const UserContext = createContext()

export const useUser = () => {
    return useContext(UserContext)
}

// Provider -> managing state
const UserProvider = ({ children }) => {
    const [user, setUser] = useState(storageRead(STORAGE_KEY_USER))
    const state = {
        user,
        setUser
    }
    return (
        <UserContext.Provider value={state}>
            {children}
        </UserContext.Provider>
    )
}
export default UserProvider