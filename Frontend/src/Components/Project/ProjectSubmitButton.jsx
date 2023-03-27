import { STORAGE_KEY_EDIT_MODE, STORAGE_KEY_PROJECT, STORAGE_KEY_PROJECTS, STORAGE_KEY_PROJECTS_TO_SHOW, STORAGE_KEY_USER } from '../../const/storageKeys'
import { useUser } from '../../context/UserContext'
import { useEditMode } from '../../context/EditMode'
import { updateProject } from '../../api/projects'
import { useProject } from '../../context/ProjectContext'
import { useProjects } from '../../context/ProjectsContext'
import { useProjectsToShow } from '../../context/ProjectsToShowContext'
import { userByName } from '../../api/user'
import { storageSave } from '../../utils/storage'
import { useState } from 'react'


const ProjectSubmitButton = ({ updatedProject }) => {

    const { user, setUser } = useUser()
    const { project, setProject } = useProject()
    const { projects, setProjects } = useProjects()
    const { projectsToShow, setProjectsToShow } = useProjectsToShow()
    const { editMode, setEditMode } = useEditMode()
    const [error, setError] = useState(null)
    let errorMessage = []


    const onSubmit = async () => {
        if (projects.filter(pr => pr.project_title !== project.project_title)
            .some(p => p.project_title.toLowerCase() === updatedProject.project_title.toLowerCase())) {
            alert('The title is already being used, please change it!')
        }
        else if (updatedProject.skills.length === 0) {
            alert('Project should have at least one required skill!')
        }
        else {
            console.log(updatedProject.project_id)
            const [error, response] = await updateProject(updatedProject)
            if(error === null){

                let tempProjects = projects.filter(project => project.project_id !== updatedProject.project_id)
                tempProjects.push(updatedProject)
                storageSave(STORAGE_KEY_PROJECTS, tempProjects)
                setProjects(tempProjects)
    
                storageSave(STORAGE_KEY_PROJECT, updatedProject)
                setProject(updatedProject)
    
                setProjectsToShow(tempProjects)
                storageSave(STORAGE_KEY_PROJECTS_TO_SHOW, tempProjects)
    
    
                const [userError, userResponse] = await userByName(user.user_name)
                if(userError === null){

                    storageSave(STORAGE_KEY_USER, userResponse)
                    setUser(userResponse)
                }else{
                    setError("Action failed. Failed to retrieve user data from database")
                }
            }else{
                setError("Action failed. Project is not updated")
            }

            storageSave(STORAGE_KEY_EDIT_MODE, false)
            setEditMode(false)
        }
    }

    const onCancel = () => {
        storageSave(STORAGE_KEY_EDIT_MODE, false)
        setEditMode(false)
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
export default ProjectSubmitButton