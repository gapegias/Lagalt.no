import { createContext, useContext, useState } from "react"
import { STORAGE_KEY_PROJECTS_TO_SHOW } from "../const/storageKeys"
import { storageRead } from "../utils/storage"

const ProjectsToShowContext = createContext()

export const useProjectsToShow = () => {
    return useContext(ProjectsToShowContext)
}

// Provider -> managing state
const ProjectsToShowProvider = ({ children }) => {
    const [projectsToShow, setProjectsToShow] = useState(storageRead(STORAGE_KEY_PROJECTS_TO_SHOW))
    const state = {
        projectsToShow,
        setProjectsToShow
    }
    return (
        <ProjectsToShowContext.Provider value={state}>
            {children}
        </ProjectsToShowContext.Provider>
    )
}
export default ProjectsToShowProvider