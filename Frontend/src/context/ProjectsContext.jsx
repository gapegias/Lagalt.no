import { createContext, useContext, useState } from "react"
import { STORAGE_KEY_PROJECTS } from "../const/storageKeys"
import { storageRead } from "../utils/storage"

const ProjectsContext = createContext()

export const useProjects = () => {
    return useContext(ProjectsContext)
}

// Provider -> managing state
const ProjectsProvider = ({ children }) => {
    const [projects, setProjects] = useState(storageRead(STORAGE_KEY_PROJECTS))
    const state = {
        projects,
        setProjects
    }
    return (
        <ProjectsContext.Provider value={state}>
            {children}
        </ProjectsContext.Provider>
    )
}
export default ProjectsProvider