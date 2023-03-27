import { createContext, useContext, useState } from 'react'

// Context -> exposing
const SideBarSelectContext = createContext()

export const useSideBarSelect = () => {
    return useContext(SideBarSelectContext)
}

// Provider -> managing state
const SideBarSelectProvider = ({ children }) => {
    const [sideBarSelect, setSideBarSelect] = useState(false)
    const state = {
        sideBarSelect,
        setSideBarSelect
    }
    return (
        <SideBarSelectContext.Provider value={state}>
            {children}
        </SideBarSelectContext.Provider>
    )
}
export default SideBarSelectProvider