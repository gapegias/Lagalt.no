import { addRequestToProject, updateProject } from '../../api/projects'
import { addRequest } from '../../api/requests'
import { userByName } from '../../api/user'
import { STORAGE_KEY_PROJECT, STORAGE_KEY_PROJECTS, STORAGE_KEY_PROJECTS_TO_SHOW, STORAGE_KEY_REQUESTS, STORAGE_KEY_USER } from '../../const/storageKeys'
import { useProject } from '../../context/ProjectContext'
import { useProjects } from '../../context/ProjectsContext'
import { useProjectsToShow } from '../../context/ProjectsToShowContext'
import { useRequests } from '../../context/RequestsContext'
import { useUser } from '../../context/UserContext'
import { storageRead, storageSave } from '../../utils/storage'
import './JoinButton.css'

const QuitButton = () => {
    const { user, setUser } = useUser()
    const { project, setProject } = useProject()
    const { projects, setProjects } = useProjects()
    const { projectsToShow, setProjectsToShow } = useProjectsToShow()

    const onQuit = async () => {
        const updatedProject = {
            ...project,
            users: project.users.filter(u => u.user_name !== user.user_name)
        }

        let tempProjects = projects.filter(project => project.project_id !== updatedProject.project_id)
        tempProjects.push(updatedProject)

        const [error, response] = await updateProject(updatedProject)
        storageSave(STORAGE_KEY_PROJECTS, tempProjects)
        setProjects(tempProjects)

        storageSave(STORAGE_KEY_PROJECT, updatedProject)
        setProject(updatedProject)

        storageSave(STORAGE_KEY_PROJECTS_TO_SHOW, tempProjects)
        setProjectsToShow(tempProjects)


        const [userError, userResponse] = await userByName(user.user_name)
        storageSave(STORAGE_KEY_USER, userResponse)
        setUser(userResponse)
    }


    return (
        <>
            <button className='button-29' type='submit' onClick={onQuit}>Quit</button>
        </>
    )
}
export default QuitButton