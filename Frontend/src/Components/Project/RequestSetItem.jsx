import { useState } from "react"
import { NavLink } from "react-router-dom"
import { updateProject } from "../../api/projects"
import { deleteRequest } from "../../api/requests"
import { userById, userByName } from "../../api/user"
import { STORAGE_KEY_PROJECT, STORAGE_KEY_PROJECTS, STORAGE_KEY_PROJECTS_TO_SHOW, STORAGE_KEY_REQUESTS, STORAGE_KEY_USER, STORAGE_KEY_USER_PROFILE } from "../../const/storageKeys"
import { useProject } from "../../context/ProjectContext"
import { useProjects } from "../../context/ProjectsContext"
import { useProjectsToShow } from "../../context/ProjectsToShowContext"
import { useRequests } from "../../context/RequestsContext"
import { useUser } from "../../context/UserContext"
import { useUserProfile } from "../../context/UserProfileContext"
import { storageRead, storageSave } from "../../utils/storage"

const RequestSetItem = ({ request }) => {
    const { user, setUser } = useUser()
    const { requests, setRequests } = useRequests()
    const { project, setProject } = useProject()
    const { projects, setProjects } = useProjects()
    const { projectsToShow, setProjectsToShow } = useProjectsToShow()
    const { userProfile, setUserProfile } = useUserProfile()
    const [error, setError] = useState(null)

    const onDeclineClick = async () => {

        const updatedProject = {
            ...project,
            requests: project.requests.filter(r => r.request_id !== request.request_id)
        }

        saveData(updatedProject)
    }

    const onAcceptClick = async () => {

        const [error, newUser] = await userById(request.request_user_id)
        if (error === null) {

            const updatedProject = {
                ...project,
                users: [...project.users, newUser],
                requests: project.requests.filter(r => r.request_id !== request.request_id)
            }
            saveData(updatedProject)
        } else {
            setError("Action failed. Failed to retrieve user data from database")
        }
    }

    const saveData = async (updatedProject) => {
        const [updateApiError, updateResp] = await updateProject(updatedProject)
        console.log(updateApiError)
        if (updateApiError !== null) {
            setError('Action failed. Try again!')
            return
        }

        storageSave(STORAGE_KEY_PROJECT, updatedProject)
        setProject(updatedProject)
        storageSave(STORAGE_KEY_PROJECTS, [...projects.filter(p => p.project_id !== project.project_id), updatedProject])
        setProjects(storageRead(STORAGE_KEY_PROJECTS))
        storageSave(STORAGE_KEY_PROJECTS_TO_SHOW, storageRead(STORAGE_KEY_PROJECTS))
        setProjectsToShow(storageRead(STORAGE_KEY_PROJECTS))

        const [userError, userResponse] = await userByName(user.user_name)
        if (userError !== null) {
            setError('Action failed. User could not be found. Try again!')
            return
        }
        storageSave(STORAGE_KEY_USER, userResponse)
        setUser(userResponse)

        const [reqApiError, reqResp] = await deleteRequest(request.request_id)
        if (reqApiError !== null) {
            setError('Action failed. Request could not be deleted. Try again!')
            return
        }
        setRequests(requests.filter(r => r.request_id !== request.request_id))
        storageSave(STORAGE_KEY_REQUESTS, requests.filter(r => r.request_id !== request.request_id))



    }

    const onNavigateToProfile = async () => {
        const [error, response] = await userByName(request.request_user_name)
        if (error !== null) {
            setError('Action failed. User could not be found. Try again!')
            return
        }
        storageSave(STORAGE_KEY_USER_PROFILE, response)
        setUserProfile(storageRead(STORAGE_KEY_USER_PROFILE))
    }


    return (
        <div >
            <ul key={request.request_id} className="single-request" >
                <NavLink onClick={onNavigateToProfile} to='/profile' style={{ textDecoration: 'none', color: '#E4E5E8' }} >
                    <h3>{request.request_user_name} asked to join.</h3>
                </NavLink>
                <span className="accept-decline-box">
                    <button className='button-29' type='submit' onClick={onAcceptClick}>Accept</button>
                    <button className='button-29' type='submit' onClick={onDeclineClick} >Decline</button>
                </span>
            </ul>
            {error !== null && <div>{error}</div>}
        </div>
    )

}
export default RequestSetItem