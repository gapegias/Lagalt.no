import './CreateProject.css'
import { storageRead, storageSave } from '../../utils/storage'
import { STORAGE_KEY_PROJECT, STORAGE_KEY_PROJECTS, STORAGE_KEY_PROJECTS_TO_SHOW, STORAGE_KEY_USER, STORAGE_KEY_USER_PROFILE } from '../../const/storageKeys'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../../context/UserContext'
import {  createProject } from '../../api/projects'
import { useProjects } from '../../context/ProjectsContext'
import { useProject } from '../../context/ProjectContext'
import { useProjectsToShow } from '../../context/ProjectsToShowContext'
import { updateUser, userByName } from '../../api/user'
import { useUserProfile } from '../../context/UserProfileContext'
import { useState } from 'react'


const CreateSubmitButton = ({ newProject }) => {

    const navigate = useNavigate()

    const { user, setUser } = useUser()
    const { userProfile, setUserProfile } = useUserProfile()
    const {projects, setProjects} = useProjects()
    const {project, setProject} = useProject()
    const {projectsToShow, setProjectsToShow} = useProjectsToShow()
    const [error, setError] = useState(null)

    const onSubmit = async () => {

        if(projects.some(pr=> pr.project_title === newProject.project_title)){
            alert('This project title is already exists')
        }
        else if(newProject.skills.length === 0){
            alert('Project should have at least one required skill!')
        }
        else if(typeof newProject.project_topic === "undefined" || newProject.project_topic === null){
            alert('You have to choose a topic!')
        }
        else{
            const [error,projectResponse]= await createProject(newProject)
            if(error !== null){
                setError('Action failed. Projects is not created.')
                return
            }
            storageSave(STORAGE_KEY_PROJECTS, [...projects, newProject])
            setProjects(storageRead(STORAGE_KEY_PROJECTS))
    
            storageSave(STORAGE_KEY_PROJECT,newProject)
            setProject(newProject)
    
            storageSave(STORAGE_KEY_PROJECTS_TO_SHOW,storageRead(STORAGE_KEY_PROJECTS))
            setProjectsToShow(storageRead(STORAGE_KEY_PROJECTS))

            let updatedUser ={...user, projects:[...user.projects,newProject]}
            console.log(updatedUser)
            const [errorUpdateUser, response] = await updateUser(updatedUser.user_id, updatedUser)
            if(errorUpdateUser !== null){
                setError('Action failed. User is not updated.')
                return
            }
            const [errorUser, responseUser] = await userByName(updatedUser.user_name)
            if(errorUpdateUser !== null){
                setError('Failed to retrieve users data from the database')
                return
            }
            storageSave(STORAGE_KEY_USER, responseUser)
            storageSave(STORAGE_KEY_USER_PROFILE, responseUser)
            setUser(responseUser)
            setUserProfile(responseUser)

            navigate("/project")
        }
    }

    const onCancel = () =>{
        navigate("/")
    }

    return (
        <>
            <div className="button-bottom-box">
                <button className='button-29' type='submit' onClick={onSubmit}>Submit</button>
                <button className='button-29' type='submit' onClick={onCancel}>Cancel</button>
            </div>
            {error !== null && <div>{error}</div>}
        </>
    )
}
export default CreateSubmitButton