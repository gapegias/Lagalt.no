import { useEffect, useState } from "react"
import { findAllMessages } from "../api/messages"
import { findAllProjects } from "../api/projects"
import { findAllRequests } from "../api/requests"
import { findAllSkills } from "../api/skills"
import { findAllUsers } from "../api/user"
import NavBar from "../Components/NavBar/NavBar"
import ProjectSet from "../Components/Project/ProjectSet"
import TopicsBar from "../Components/TopicsBar/TopicsBar"
import { STORAGE_KEY_EDIT_MODE, STORAGE_KEY_MESSAGES, STORAGE_KEY_PROJECTS, STORAGE_KEY_PROJECTS_TO_SHOW, STORAGE_KEY_REQUESTS, STORAGE_KEY_SKILLS, STORAGE_KEY_USERS } from "../const/storageKeys"
import { useEditMode } from "../context/EditMode"
import { useMessages } from "../context/MessagesContext"
import { useProjects } from "../context/ProjectsContext"
import { useProjectsToShow } from "../context/ProjectsToShowContext"
import { useRequests } from "../context/RequestsContext"
import { useSkills } from "../context/SkillsContext"
import { useUsers } from "../context/UsersContext"
import { storageSave } from "../utils/storage"
import './HomePage.css'


const HomePage = () => {

    const { projects, setProjects } = useProjects()
    const { projectsToShow, setProjectsToShow } = useProjectsToShow();
    const {requests, setRequests} = useRequests()
    const {messages, setMessages} = useMessages()
    const {users, setUsers} = useUsers()
    const {skills, setSkills} = useSkills()
    const { editMode, setEditMode } = useEditMode()
    const [isLoading, setIsLoading] = useState(false)

    // Fetching all needed data from API and saves them to the session storage
    const getAllData = async () => {
        setIsLoading(true)
        const [projectErrorApi, projectsResponse] = await findAllProjects()
        let sortedProjects = projectsResponse.map(pr=>pr).sort(function(x,y){return y.project_id - x.project_id})
        storageSave(STORAGE_KEY_PROJECTS, sortedProjects)
        storageSave(STORAGE_KEY_PROJECTS_TO_SHOW, sortedProjects)
        setProjects(sortedProjects)
        setProjectsToShow(sortedProjects)

        const [userErrorApi, usersResponse] = await findAllUsers()
        storageSave(STORAGE_KEY_USERS, usersResponse)
        setUsers(usersResponse)

        const [messagesErrorApi, messagesResponse] = await findAllMessages()
        storageSave(STORAGE_KEY_MESSAGES, messagesResponse)
        setMessages(messagesResponse)

        const [skillsErrorApi, skillsResponse] = await findAllSkills()
        storageSave(STORAGE_KEY_SKILLS, skillsResponse)
        setSkills(skillsResponse)

        const [requestsErrorApi, requestsResponse] = await findAllRequests()
        storageSave(STORAGE_KEY_REQUESTS, requestsResponse)
        setRequests(requestsResponse)

        setIsLoading(false)
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
            console.log(projects.length)
            getAllData()
        }
        storageSave(STORAGE_KEY_EDIT_MODE,false)
        setEditMode(false)
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
                        {!isLoading && areDataFetched() && <ProjectSet projectsToDisplay={projectsToShow}/>}
                </div>
            </div>
        </>
    )
}
export default HomePage