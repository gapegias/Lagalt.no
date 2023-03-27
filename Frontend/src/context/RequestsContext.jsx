import { createContext, useContext, useState } from 'react'
import { STORAGE_KEY_REQUESTS } from '../const/storageKeys'
import { storageRead } from '../utils/storage'

// Context -> exposing
const RequestsContext = createContext()

export const useRequests = () => {
    return useContext(RequestsContext)
}

// Provider -> managing state
const RequestsProvider = ({ children }) => {
    const [requests, setRequests] = useState(storageRead(STORAGE_KEY_REQUESTS))
    const state = {
        requests,
        setRequests
    }
    return (
        <RequestsContext.Provider value={state}>
            {children}
        </RequestsContext.Provider>
    )
}
export default RequestsProvider