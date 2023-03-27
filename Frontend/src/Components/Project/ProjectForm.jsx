import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { STORAGE_KEY_PROJECT, STORAGE_KEY_PROJECTS, STORAGE_KEY_PROJECTS_TO_SHOW, STORAGE_KEY_USER, STORAGE_KEY_USER_PROFILE } from '../../const/storageKeys'
import { storageRead, storageSave } from '../../utils/storage'
import ValuesSet from '../Profile/ValuesSet'
import MessageSet from './MessageSet'
import RequestSet from './RequestSet'
import './ProjectForm.css'
import { useUserProfile } from '../../context/UserProfileContext'
import { useProject } from '../../context/ProjectContext'
import { userByName } from '../../api/user'
import { useEditMode } from '../../context/EditMode'
import { useUser } from '../../context/UserContext'
import JoinButton from './JoinButton'
import { useProjects } from '../../context/ProjectsContext'
import { useProjectsToShow } from '../../context/ProjectsToShowContext'
import QuitButton from './QuitButton'

const ProjectForm = () => {

    const { userProfile, setUserProfile } = useUserProfile()
    const { user, setUser } = useUser()
    const { project, setProject } = useProject()
    const { projects, setProjects } = useProjects()
    const { projectsToShow, setProjectsToShow } = useProjectsToShow()
    const [showMembers, setShowMembers] = useState(false)
    const [showChat, setShowChat] = useState(false)
    const [showRequests, setShowRequests] = useState(false)
    const [showEditButton, setShowEditButton] = useState(false)
    const { editMode, setEditMode } = useEditMode()

    const skillNames = project.skills.map((skill) => skill.skill_name)
    const memberNames = project.users.map((user) => user.user_name)
    const isMember = project.users.some((u) => u.user_name === user.user_name)


    const onMembersClick = () => {
        setShowChat(false)
        setShowRequests(false)
        setShowMembers(!showMembers)
    }

    const onChatClick = () => {
        setShowMembers(false)
        setShowRequests(false)
        setShowChat(!showChat)
    }

    const onRequestsClick = () => {
        setShowMembers(false)
        setShowChat(false)
        setShowRequests(!showRequests)
    }

    const isEditable = () => {
        if (user !== null && !editMode) {
            if (user.user_name === project.project_owner) {
                return true
            }
        }
        return false
    }

    const onEdit = () => {
        setEditMode(true)
        setShowEditButton(false)
    }


    const changeProfile = async () => {
        const [error, responseUsers] = await userByName(project.project_owner)
        storageSave(STORAGE_KEY_USER_PROFILE, responseUsers)
        setUserProfile(storageRead(STORAGE_KEY_USER_PROFILE))
    }


    return (
        <>
            <div className='Profile-form-box'>
                <div className='Name-box'>
                    <h2>{project.project_title} </h2>
                    <h3>{project.project_topic}</h3>
                </div>
                <div className='Body-box'>
                    <div className='Details-left-box'>
                        <h3>Purpose</h3>
                        <p>{project.purpose}</p>
                        {user !== null && <span className='Repository'>
                            <h3>Repository</h3>
                            {project.project_repo_url &&
                                <p><a className='Repo-link' href={project.project_repo_url}>Click to navigate</a></p>}
                            {!project.project_repo_url &&
                                <p><a>Empty</a></p>}
                        </span>}
                        <button className='button-29' type='submit' onClick={onMembersClick} >Members</button>
                        {user !== null && <button className='button-29' type='submit' onClick={onChatClick} >Chat</button>}
                        {user !== null && user.user_name === project.project_owner && <button className='button-29' type='submit' onClick={onRequestsClick} >Requests</button>}
                    </div>
                    <div className='Skills-box'>
                        <ValuesSet values={skillNames} tagName="Skills" />
                    </div>
                </div>
                <span className='Bottom-box'>
                    <span className='owner'>
                        <h3>Admin</h3>
                        <p className='owner-link'><NavLink onClick={changeProfile} to="/profile">{project.project_owner}</NavLink></p>
                    </span>
                    <span className='stage'>
                        <h3>Stage</h3>
                        <p className='stage-h3'> {project.project_stage}</p>
                    </span>
                    <div className="join-quit-button">
                        {user !== null && (user.user_name === project.project_owner) && <button className='button-29' type='submit' >Kick</button>}                   
                        {user !== null && isMember && (user.user_name !== project.project_owner) && <QuitButton/>}
                        {user !== null && !isMember && (user.user_name !== project.project_owner) && <JoinButton pr={project} />}
                    </div>
                </span>
                {showMembers && <div className='Members-box'><ValuesSet values={memberNames} tagName="Members" /></div>}
                {showChat && <div className='Members-box'><MessageSet /></div>}
                {showRequests && <div className='Members-box'><RequestSet /> </div>}
            </div>
            {isEditable() && <div className='button-bottom-box'> <button onClick={onEdit} className='button-29' type='submit'  >Edit</button></div>}
        </>
    )
}
export default ProjectForm