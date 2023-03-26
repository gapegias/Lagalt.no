import { useEffect, useState } from "react"
import { findAllMessages } from "../api/messages"
import { findAllProjects } from "../api/projects"
import { findAllRequests } from "../api/requests"
import { findAllSkills } from "../api/skills"
import { findAllUsers, loginUser, userByName } from "../api/user"
import NavBar from "../Components/NavBar/NavBar"
import ProjectSet from "../Components/Project/ProjectSet"
import TopicsBar from "../Components/TopicsBar/TopicsBar"
import { STORAGE_KEY_EDIT_MODE, STORAGE_KEY_MESSAGES, STORAGE_KEY_PROJECTS, STORAGE_KEY_PROJECTS_TO_SHOW, STORAGE_KEY_REQUESTS, STORAGE_KEY_SKILLS, STORAGE_KEY_USER, STORAGE_KEY_USERS, STORAGE_KEY_USER_PROFILE } from "../const/storageKeys"
import { useEditMode } from "../context/EditMode"
import { useMessages } from "../context/MessagesContext"
import { useProjects } from "../context/ProjectsContext"
import { useProjectsToShow } from "../context/ProjectsToShowContext"
import { useRequests } from "../context/RequestsContext"
import { useSkills } from "../context/SkillsContext"
import { useUser } from "../context/UserContext"
import { useUserProfile } from "../context/UserProfileContext"
import { useUsers } from "../context/UsersContext"
import keycloak from "../keycloak"
import { storageDelete, storageSave } from "../utils/storage"
import './HomePage.css'


const HomePage = () => {

    const { projects, setProjects } = useProjects()
    const { projectsToShow, setProjectsToShow } = useProjectsToShow();
    const { requests, setRequests } = useRequests()
    const { messages, setMessages } = useMessages()
    const { users, setUsers } = useUsers()
    const { skills, setSkills } = useSkills()
    const { editMode, setEditMode } = useEditMode()
    const { user, setUser } = useUser()
    const { userProfile, setUserProfile } = useUserProfile()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    // Fetching all needed data from API and saves them to the session storage
    const getAllData = async () => {
        setIsLoading(true)
        const [projectErrorApi, projectsResponse] = await findAllProjects()
        if(projectErrorApi !== null){
            setError('Failed to retrieve projects from database')
            return
        }
        let sortedProjects = projectsResponse.map(pr => pr).sort(function (x, y) { return y.project_id - x.project_id })
        storageSave(STORAGE_KEY_PROJECTS, sortedProjects)
        storageSave(STORAGE_KEY_PROJECTS_TO_SHOW, sortedProjects)
        setProjects(sortedProjects)
        setProjectsToShow(sortedProjects)

        const [userErrorApi, usersResponse] = await findAllUsers()
        if(userErrorApi !== null){
            setError('Failed to retrieve users from database')
            return
        }
        storageSave(STORAGE_KEY_USERS, usersResponse)
        setUsers(usersResponse)

        const [messagesErrorApi, messagesResponse] = await findAllMessages()
        if(messagesErrorApi !== null){
            setError('Failed to retrieve messages from database')
            return
        }
        storageSave(STORAGE_KEY_MESSAGES, messagesResponse)
        setMessages(messagesResponse)

        const [skillsErrorApi, skillsResponse] = await findAllSkills()
        if(skillsErrorApi !== null){
            setError('Failed to retrieve skills from database')
            return
        }
        storageSave(STORAGE_KEY_SKILLS, skillsResponse)
        setSkills(skillsResponse)

        const [requestsErrorApi, requestsResponse] = await findAllRequests()
        if(requestsErrorApi !== null){
            setError('Failed to retrieve requests from database')
            return
        }
        storageSave(STORAGE_KEY_REQUESTS, requestsResponse)
        setRequests(requestsResponse)

        setIsLoading(false)
    }

    const readUser = async () => {
        if (typeof keycloak.tokenParsed !== 'undefined') {
            const [error, userResponse] = await loginUser(keycloak.tokenParsed.preferred_username)
            if(error !== null){
                setError('Failed to retrieve user from database')
                return
            }
            storageSave(STORAGE_KEY_USER, userResponse)
            storageSave(STORAGE_KEY_USER_PROFILE, userResponse)                  // saves user's data to the session storage
            setUser(userResponse)
            setUserProfile(userResponse)
            // setIsPressed(true)
        }
    }

    const deleteUser = ()=>{
        storageDelete(STORAGE_KEY_USER)
        setUser(null)
        storageDelete(STORAGE_KEY_USER_PROFILE)
        setUserProfile(null)
    }

    const areDataFetched = () => {
        if (projects.length > 0 &&
            requests.length > 0 &&
            messages.length > 0 &&
            users.length > 0 &&
            skills.length > 0) {
            return true
        }
        return false
    }

    useEffect(() => {
        if (projects.length === 0) {
            getAllData()
        }
        storageSave(STORAGE_KEY_EDIT_MODE, false)
        setEditMode(false)
        if (keycloak.authenticated) {
            readUser()
        } else {
            deleteUser()
        }
    }, []);


    return (
        <>
            <NavBar />
            <div className="Main">
                <div className="Side-bar">
                    {!isLoading && areDataFetched() && <TopicsBar />}
                </div>
                <div className="Main-body">
                    {isLoading && <h2>Loading Page</h2>}
                    {!isLoading && areDataFetched() && <ProjectSet projectsToDisplay={projectsToShow} />}
                </div>
                {error !== null && <div>{error}</div>}
            </div>
        </>
    )
}
export default HomePage