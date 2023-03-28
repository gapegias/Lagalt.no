import { useState } from 'react'
import { updateProject } from '../../api/projects'
import { addRequest } from '../../api/requests'
import { userByName } from '../../api/user'
import { ROLES } from '../../const/roles'
import { STORAGE_KEY_PROJECT, STORAGE_KEY_PROJECTS, STORAGE_KEY_PROJECTS_TO_SHOW, STORAGE_KEY_REQUESTS, STORAGE_KEY_USER, STORAGE_KEY_USER_PROFILE } from '../../const/storageKeys'
import { useProject } from '../../context/ProjectContext'
import { useProjects } from '../../context/ProjectsContext'
import { useProjectsToShow } from '../../context/ProjectsToShowContext'
import { useRequests } from '../../context/RequestsContext'
import { useUser } from '../../context/UserContext'
import { useUserProfile } from '../../context/UserProfileContext'
import keycloak from '../../keycloak'
import { storageRead, storageSave } from '../../utils/storage'
import './JoinButton.css'

const JoinButton = ({ pr }) => {
    const { user, setUser } = useUser()
    const { userProfile, setUserProfile } = useUserProfile()
    const { projects, setProjects } = useProjects()
    const { setProjectsToShow } = useProjectsToShow();
    const { setProject } = useProject()
    const { requests, setRequests } = useRequests()
    const [error, setError] = useState(null)


    const isRequested = () => {
        let found = false
        if (keycloak.hasRealmRole(ROLES.User)) {
            found = pr.requests.some((request) => {
                return (request.request_user_id === user.user_id)
            })
        }
        return found
    }

    const onJoin = async () => {
        let max = 0
        const maxId = requests.map(r => {
            if (r.request_id > max) {
                max = r.request_id
            }
        })

        const newRequest = {
            request_id: max + 1,
            request_text: "",
            request_user_id: user.user_id,
            request_user_name: user.user_name
        }

        const [requestError, requestResponse] = await addRequest(newRequest)
        if (requestError !== null) {
            setError("Action failed. Request is not created.")
            return
        }
        storageSave(STORAGE_KEY_REQUESTS, [...requests, newRequest])
        setRequests(storageRead(STORAGE_KEY_REQUESTS))

        const updatedProject = {
            ...pr,
            requests: [...pr.requests, newRequest]
        }
        const [projectError, projectResponse] = await updateProject(updatedProject)
        if (projectError !== null) {
            setError('Action failed. Project is not updated')
            return
        }
        storageSave(STORAGE_KEY_PROJECT, updatedProject)
        setProject(updatedProject)

        storageSave(STORAGE_KEY_PROJECTS, [...projects.filter(p => p.project_id !== pr.project_id), updatedProject])
        setProjects(storageRead(STORAGE_KEY_PROJECTS))

        storageSave(STORAGE_KEY_PROJECTS_TO_SHOW, storageRead(STORAGE_KEY_PROJECTS))
        setProjectsToShow(storageRead(STORAGE_KEY_PROJECTS))

        // Den xreiazetai giati akoma den anhkout ta project ston user, exei kanei apla request
        const [userError, userResponse] = await userByName(user.user_name)
        storageSave(STORAGE_KEY_USER, userResponse)
        setUser(userResponse)

        const [userErrorUserProf, userResponseUserProf] = await userByName(userProfile.user_name)
        storageSave(STORAGE_KEY_USER_PROFILE, userResponseUserProf)
        setUserProfile(userResponseUserProf)
    }

    return (
        <>
            {!isRequested() && <button onClick={onJoin} className="button-29">Join</button>}
            {isRequested() && <p className='request-sent'>Request sent</p>}
            {error !== null && <div>{error}</div>}
        </>
    )
}
export default JoinButton