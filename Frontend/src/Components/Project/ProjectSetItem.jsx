import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { userByName } from '../../api/user'
import { ROLES } from '../../const/roles'
import { STORAGE_KEY_PROJECT, STORAGE_KEY_USER_PROFILE } from '../../const/storageKeys'
import { useProject } from '../../context/ProjectContext'
import { useUser } from '../../context/UserContext'
import { useUserProfile } from '../../context/UserProfileContext'
import keycloak from '../../keycloak'
import { storageRead, storageSave } from '../../utils/storage'
import JoinButton from './JoinButton'
import './ProjectSetItem.css'

const ProjectSetItem = ({ pr }) => {
    const { user } = useUser()
    const { setUserProfile } = useUserProfile()
    const { setProject } = useProject()
    const [error, setError] = useState(null)


    const isJoined = () => {
        let found = false
        if (keycloak.hasRealmRole(ROLES.User)) {
            found = user.projects.some((pr1) => {
                return (pr1.project_id === pr.project_id)
            })
        }
        return found
    }

    const compatibility = () => {
        let matchedSkills = 0.0
        if (keycloak.hasRealmRole(ROLES.User)) {
            user.skills.map(skill => pr.skills.map((prSkill => {
                if (skill.skill_name === prSkill.skill_name) {
                    matchedSkills += 1.0
                }
            })))
        }
        let numberOfProjectSkills = pr.skills.length
        if ((matchedSkills / numberOfProjectSkills) <= 1 && (matchedSkills / numberOfProjectSkills) >= 0.9) {
            return "Completely match"
        }
        else if ((matchedSkills / numberOfProjectSkills) < 0.9 && (matchedSkills / numberOfProjectSkills) >= 0.75) {
            return "Very good match"
        }
        else if ((matchedSkills / numberOfProjectSkills) < 0.75 && (matchedSkills / numberOfProjectSkills) >= 0.5) {
            return "Good match"
        }
        else if ((matchedSkills / numberOfProjectSkills) < 0.5 && (matchedSkills / numberOfProjectSkills) >= 0.25) {
            return "Quite match"
        }
        else if ((matchedSkills / numberOfProjectSkills) < 0.25 && (matchedSkills / numberOfProjectSkills) >= 0) {
            return "Not match"
        }

        return (matchedSkills / numberOfProjectSkills).toString()
    }

    const checkColor = () => {
        switch (compatibility()) {
            case "Completely match":
                return 'green'
            case "Very good match":
                return "#E5FE3F";
            case "Good match":
                return "#E6D85B";
            case "Quite match":
                return "#FE9001";
            case "Not match":
                return "#cb2d3e";
            default:
        }
    }

    const onNavigateToProject = () => {
        storageSave(STORAGE_KEY_PROJECT, pr)
        setProject(pr)
    }

    const onNavigateToProfile = async () => {
        const [error, response] = await userByName(pr.project_owner)
        if (error !== null) {
            setError("Action failed. Failed to retrieve user data from database")
            return
        }
        storageSave(STORAGE_KEY_USER_PROFILE, response)
        setUserProfile(storageRead(STORAGE_KEY_USER_PROFILE))
    }

    return (
        <>
            <div className="ProjectItem-box">
                <NavLink onClick={onNavigateToProject} to='/project' style={{ textDecoration: 'none' }} >
                    <section className='ProjectItem-header'>
                        <h3>{pr.project_title}</h3>
                        <h3>{pr.project_topic}</h3>
                    </section>
                </NavLink>
                <section className='ProjectItem-body'>
                    <div className='Text-box'>
                        <div className="admin-link-box">
                            <h3>Admin:</h3>
                            <NavLink onClick={onNavigateToProfile} style={{ textDecoration: 'none' }} to='/profile'  >
                                <h3 className='admin-box'>{pr.project_owner}</h3>
                            </NavLink>
                        </div>
                        {keycloak.hasRealmRole(ROLES.User) &&
                            <div style={{
                                fontWeight: 'bold',
                                color: "#0C0C1E",
                                background: `${checkColor(compatibility())}`
                            }} className="project-compatibility">{compatibility()}</div>}
                        <h3>{pr.project_stage} </h3>
                    </div>
                    <div className='Button-stage-box'>
                        {!isJoined() && (user !== null) && <JoinButton pr={pr} />}
                    </div>
                </section>

            </div>
            {error !== null && <div>{error}</div>}
        </>
    )
}
export default ProjectSetItem