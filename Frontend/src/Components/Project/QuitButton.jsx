import { useState } from 'react'
import { updateProject } from '../../api/projects'
import { userByName } from '../../api/user'
import { STORAGE_KEY_PROJECT, STORAGE_KEY_PROJECTS, STORAGE_KEY_PROJECTS_TO_SHOW, STORAGE_KEY_USER } from '../../const/storageKeys'
import { useProject } from '../../context/ProjectContext'
import { useProjects } from '../../context/ProjectsContext'
import { useProjectsToShow } from '../../context/ProjectsToShowContext'
import { useUser } from '../../context/UserContext'
import { storageSave } from '../../utils/storage'
import './JoinButton.css'

const QuitButton = () => {
    const { user, setUser } = useUser()
    const { project, setProject } = useProject()
    const { projects, setProjects } = useProjects()
    const { setProjectsToShow } = useProjectsToShow()
    const [error, setError] = useState(null)

    const onQuit = async () => {
        const updatedProject = {
            ...project,
            users: project.users.filter(u => u.user_name !== user.user_name)
        }

        let tempProjects = projects.filter(project => project.project_id !== updatedProject.project_id)
        tempProjects.push(updatedProject)

        const [error, response] = await updateProject(updatedProject)
        if(error === null){
            storageSave(STORAGE_KEY_PROJECTS, tempProjects)
            setProjects(tempProjects)
    
            storageSave(STORAGE_KEY_PROJECT, updatedProject)
            setProject(updatedProject)
    
            storageSave(STORAGE_KEY_PROJECTS_TO_SHOW, tempProjects)
            setProjectsToShow(tempProjects)
    
    
            const [userError, userResponse] = await userByName(user.user_name)
            if(userError === null){
                storageSave(STORAGE_KEY_USER, userResponse)
                setUser(userResponse)
            }
            else{
                setError("Action failed. Failed to retrieve user data from database")
            }
        }else{
            setError('Action SmsFailed. Project is not updated')
        }
    }


    return (
        <>
            <button className='button-29' type='submit' onClick={onQuit}>Quit</button>
            {error !== null && <div>{error}</div>}
        </>
    )
}
export default QuitButton