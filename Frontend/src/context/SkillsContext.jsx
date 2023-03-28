import { createContext, useContext, useState } from 'react'
import { STORAGE_KEY_SKILLS} from '../const/storageKeys'
import { storageRead } from '../utils/storage'

// Context -> exposing
const SkillsContext = createContext()

export const useSkills = () => {
    return useContext(SkillsContext)
}

// Provider -> managing state
const SkillsProvider = ({ children }) => {
    const [skills, setSkills] = useState(storageRead(STORAGE_KEY_SKILLS))
    const state = {
        skills,
        setSkills
    }
    return (
        <SkillsContext.Provider value={state}>
            {children}
        </SkillsContext.Provider>
    )
}
export default SkillsProvider