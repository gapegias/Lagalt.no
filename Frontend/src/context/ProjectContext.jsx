import { createContext, useContext, useState } from "react"
import { STORAGE_KEY_PROJECT } from "../const/storageKeys"
import { storageRead } from "../utils/storage"

const ProjectContext = createContext()

export const useProject = () => {
    return useContext(ProjectContext)
}

// Provider -> managing state
const ProjectProvider = ({ children }) => {
    const [project, setProject] = useState(storageRead(STORAGE_KEY_PROJECT))
    const state = {
        project,
        setProject
    }
    return (
        <ProjectContext.Provider value={state}>
            {children}
        </ProjectContext.Provider>
    )
}
export default ProjectProvider