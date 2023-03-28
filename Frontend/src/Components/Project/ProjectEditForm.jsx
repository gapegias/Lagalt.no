import ValuesSet from '../Profile/ValuesSet'
import { useState } from 'react'
import InputForm from '../Forms/InputForm'
import SingleSelectInput from '../Forms/SingleSelectInput'
import MultiSelectInput from '../Forms/MultiSelectInput'
import { storageRead, storageSave } from '../../utils/storage'
import { STORAGE_KEY_SKILLS } from '../../const/storageKeys'
import { useUser } from '../../context/UserContext'
import TextAreaForm from '../Forms//TextAreaForm'
import ProjectSubmitButton from './ProjectSubmitButton'
import { createSkill } from '../../api/skills'
import { useProjects } from '../../context/ProjectsContext'
import { useProject } from '../../context/ProjectContext'
import { useSkills } from '../../context/SkillsContext'


const ProjectEditForm = () => {
    const { user } = useUser()
    const { projects } = useProjects()
    const { project } = useProject()
    const { skills, setSkills } = useSkills()


    const [titleInput, setTitleInput] = useState()
    const [purposeInput, setPurposeInput] = useState()
    const [repositoryInput, setRepositoryInput] = useState()
    const [topicInput, setTopicInput] = useState()
    const [stageInput, setStageInput] = useState()
    const [skillsInput, setSkillsInput] = useState([])
    const stageNames = ["Initial", "In progress", "Paused", "Completed"]
    const [error, setError] = useState(null)


    const setTitle = (title) => {
        setTitleInput(title)
    }

    const setPurpose = (purpose) => {
        setPurposeInput(purpose)
    }

    const setRepository = (repository) => {
        setRepositoryInput(repository)
    }

    const setTopic = (topic) => {
        setTopicInput(topic)
    }

    const setSkillsIn = (skills) => {
        setSkillsInput(skills)
    }

    const setStage = (stage) => {
        setStageInput(stage)
    }

    const addSkills = async (newSkill) => {
        let exists = skills.some((skill) => {
            return (skill.skill_name.toLowerCase() === newSkill.toLowerCase())       //checks if new skill is already existed
        })

        if (!exists) {
            const [error, response] = await createSkill(newSkill.toUpperCase())      // Saves new skill to the API
            if (error !== null) {
                setError('Skill is not created. Try again')
                return
            }

            storageSave(STORAGE_KEY_SKILLS, [...skills, {
                skill_id: skills.length,                                            // Save new skill to session storage
                skill_name: newSkill
            }])
            setSkills(storageRead(STORAGE_KEY_SKILLS))


        }
        else {
            alert('Skill ' + newSkill + ' is already existed')
        }

    }



    const topicNames = [...new Set(projects.map(project => project.project_topic))]
    const skillsNames = [...new Set(skills.map(skill => skill.skill_name))]
    const projectSkillsNames = [...new Set(project.skills.map(skill => skill.skill_name))]
    // const skillsNames = [...new Set(skills.filter(skill => project.skills.every((prSkill => skill.name !== prSkill.name)))
    //     .map(skill => skill.name))]
    // console.log(skillsNames)

    const newSkills = skillsInput.map((skillName, i) => {
        return {
            skill_id: skills.filter((skill) => skill.skill_name === skillName)[0].skill_id,
            skill_name: skillName
        }
    })

    const newTopic = topicInput
    // id: topics.filter((topic) => topic === topicInput).id,



    const updatedProject = {
        project_id: project.project_id,
        project_title: (typeof titleInput === (("undefined") || "")) ? project.project_title : titleInput,
        project_topic: (typeof newTopic === (("undefined") || "")) ? project.project_topic : newTopic,
        project_owner: user.user_name,
        project_purpose: (typeof purposeInput === (("undefined") || "")) ? project.project_purpose : purposeInput,
        project_stage: (typeof stageInput === (("undefined") || "")) ? project.project_stage : stageInput,
        project_repo_url: (typeof repositoryInput === (("undefined") || "")) ? project.project_repo_url : repositoryInput,
        skills: ((newSkills.length === 0)) ? project.skills : newSkills,
        messages: project.messages,
        requests: project.requests,
        users: project.users
    }



    return (
        <>
            <div className='Submit-form-box'>
                <div className='Name-box'>
                    <div className='name-title-edit-box'>
                        <p> Project Title (Old) {project.project_title}</p>
                        <InputForm setValue={setTitle} />
                    </div>
                    <div className='topic-box'>
                        <h3 style={{ margin: 10 }}>Topic </h3>
                        <div className='name-title-edit-box'>
                            <p>(Old) {project.project_topic}</p>
                            <SingleSelectInput dataToSelect={topicNames} setData={setTopic} addData={true} />
                        </div>

                    </div>
                </div>
                <div className='Body-box'>
                    <div className='Details-left-box'>
                        <h3>Purpose</h3>
                        <p>(Old) {project.project_purpose}</p>
                        <TextAreaForm setValue={setPurpose} />
                        <h3>Repository</h3>
                        <p>(Old) {project.project_repo_url}</p>
                        <InputForm setValue={setRepository} />
                    </div>
                    <div className='Skills-box'>
                        <ValuesSet values={projectSkillsNames} tagName="Old Skills" />
                        <ValuesSet values={skillsInput} tagName="New Skills" />
                        <MultiSelectInput dataToSelect={skillsNames} setData={setSkillsIn} addData={addSkills} />
                    </div>
                </div>
                <span className='Bottom-box'>
                    <span className='owner'>
                        <h3>Owner </h3>
                        <p style={{ paddingLeft: 20 }} className='owner-link'>{user.user_name}</p>
                    </span>

                    <span className='stage'>
                        <h3>Stage</h3>
                        <SingleSelectInput dataToSelect={stageNames} setData={setStage} addData={false} defaultValue={project.project_stage} />
                        <p className='stage-h3'> (Old) {project.project_stage} </p>
                    </span>
                </span>
            </div>
            <ProjectSubmitButton updatedProject={updatedProject} />
            {error !== null && <div>{error}</div>}
        </>
    )
}
export default ProjectEditForm