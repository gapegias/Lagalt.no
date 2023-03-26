import { createContext, useContext, useState } from "react"

const IsSearchedContext = createContext()

export const useIsSearched = () => {
    return useContext(IsSearchedContext)
}

// Provider -> managing state
const IsSearchedProvider = ({ children }) => {
    const [isSearched, setIsSearched] = useState(false)
    const state = {
        isSearched,
        setIsSearched
    }
    return (
        <IsSearchedContext.Provider value={state}>
            {children}
        </IsSearchedContext.Provider>
    )
}
export default IsSearchedProvider