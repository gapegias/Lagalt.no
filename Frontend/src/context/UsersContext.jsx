import { createContext, useContext, useState } from 'react'
import {  STORAGE_KEY_USERS } from '../const/storageKeys'
import { storageRead } from '../utils/storage'

// Context -> exposing
const UsersContext = createContext()

export const useUsers = () => {
    return useContext(UsersContext)
}

// Provider -> managing state
const UsersProvider = ({ children }) => {
    const [users, setUsers] = useState(storageRead(STORAGE_KEY_USERS))
    const state = {
        users,
        setUsers
    }
    return (
        <UsersContext.Provider value={state}>
            {children}
        </UsersContext.Provider>
    )
}
export default UsersProvider