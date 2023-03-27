import { createContext, useContext, useState } from 'react'
import { STORAGE_KEY_MESSAGES } from '../const/storageKeys'
import { storageRead } from '../utils/storage'

// Context -> exposing
const MessagesContext = createContext()

export const useMessages = () => {
    return useContext(MessagesContext)
}

// Provider -> managing state
const MessagesProvider = ({ children }) => {
    const [messages, setMessages] = useState(storageRead(STORAGE_KEY_MESSAGES))
    const state = {
        messages,
        setMessages
    }
    return (
        <MessagesContext.Provider value={state}>
            {children}
        </MessagesContext.Provider>
    )
}
export default MessagesProvider