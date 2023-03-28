import { useState } from 'react'
import { updateProject } from '../../api/projects'
import { userByName } from '../../api/user'
import { STORAGE_KEY_PROJECT, STORAGE_KEY_PROJECTS, STORAGE_KEY_PROJECTS_TO_SHOW, STORAGE_KEY_USER } from '../../const/storageKeys'
import { useProject } from '../../context/ProjectContext'
import { useProjects } from '../../context/ProjectsContext'
import { useProjectsToShow } from '../../context/ProjectsToShowContext'
import { useUser } from '../../context/UserContext'
import { storageRead, storageSave } from '../../utils/storage'
import SingleSelectInput from '../Forms/SingleSelectInput'
import './JoinButton.css'

const KickButton = () => {
    const { user, setUser } = useUser()
    const { project, setProject } = useProject()
    const { projects, setProjects } = useProjects()
    const { setProjectsToShow } = useProjectsToShow()
    const [error, setError] = useState(null)
    const [memberInput, setMemberInput] = useState()
    const [hide, setHide] = useState(false)

    const setMember = (member) => {
        setMemberInput(member)
    }

    const memberNames = project.users.filter(u => u.user_name !== user.user_name).map(u => u.user_name)
    const onKick = async () => {
        setHide(true)
    }
    const onSubmit = async () => {
        const updatedProject = {
            ...project,
            users: project.users.filter(u=>u.user_name !== memberInput)

        }
        const [updateApiError, updateResp] = await updateProject(updatedProject)
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


        setHide(false)
    }
    const onCancel = async () => {
        setHide(false)
    }



    return (
        <>
            <div className='kick-button-box'>
                {!hide && <button className='button-29' type='submit' onClick={onKick}>Kick</button>}
                {hide && <div className="submit-kick-button-box">
                    <SingleSelectInput dataToSelect={memberNames} setData={setMember} />
                    <div className="selrct-buttob-box">
                        <button className='add-button' onClick={onSubmit}>submit</button>
                        <button className='add-button' onClick={onCancel}>cancel</button>
                    </div>
                </div>}
                {error !== null && <div>{error}</div>}
            </div>
        </>
    )
}
export default KickButton