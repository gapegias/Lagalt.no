import './CreateForm.css'
import CreateSubmitButton from './CreateSubmitButton'
import ValuesSet from '../Profile/ValuesSet'
import { useState } from 'react'
import InputForm from '../Forms/InputForm'
import SingleSelectInput from '../Forms/SingleSelectInput'
import MultiSelectInput from '../Forms/MultiSelectInput'
import { storageRead } from '../../utils/storage'
import { STORAGE_KEY_PROJECTS } from '../../const/storageKeys'
import { useUser } from '../../context/UserContext'
import TextAreaForm from '../Forms/TextAreaForm'
import { useSkills } from '../../context/SkillsContext'

const CreateForm = ({ addSkills }) => {
    const { user } = useUser()
    const { skills } = useSkills()
    const [projects] = useState(storageRead(STORAGE_KEY_PROJECTS))
    const [titleInput, setTitleInput] = useState()
    const [purposeInput, setPurposeInput] = useState()
    const [repositoryInput, setRepositoryInput] = useState()
    const [topicInput, setTopicInput] = useState()
    const [skillsInput, setSkillsInput] = useState([])

    const topics = [...new Set(projects.map(project => project.project_topic))]


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

    const setSkillsFunc = (skills) => {
        setSkillsInput(skills)
    }

    const topicNames = [...new Set(projects.map(project => project.project_topic))]
    const skillsNames = [...new Set(skills.map(skill => skill.skill_name))]

    const newSkills = skillsInput.map((skillName, i) => {
        return {
            skill_id: skills.filter((skill) => skill.skill_name === skillName)[0].skill_id,
            skill_name: skillName
        }
    })

    const newTopic = topicInput

    const newProject = {
        project_title: titleInput,
        project_topic: newTopic,
        project_owner: user.user_name,
        project_purpose: (typeof purposeInput === (("undefined") || "")) ? "" : purposeInput,
        project_stage: 'Initial',
        project_repo_url: (typeof repositoryInput === (("undefined") || "")) ? "" : repositoryInput,
        skills: newSkills,
        messages: [],
        requests: [],
        users: [user]
    }

    return (
        <>
            <div className='Submit-form-box'>
                <div className='Name-box'>
                    <h2> Project Title <InputForm setValue={setTitle} /> </h2>
                    <div className='topic-box'>
                        <SingleSelectInput dataToSelect={topicNames} setData={setTopic} addData={true} />

                        <h3 style={{ margin: 10 }}>Topic </h3>
                    </div>
                </div>
                <div className='Body-box'>
                    <div className='Details-left-box'>
                        <h3>Purpose</h3>
                        <TextAreaForm setValue={setPurpose} />
                        <h3>Repository</h3>
                        <InputForm setValue={setRepository} />
                    </div>
                    <div className='Skills-box'>
                        <MultiSelectInput dataToSelect={skillsNames} setData={setSkillsFunc} addData={addSkills} />
                        <ValuesSet values={skillsInput} tagName="Skills" />
                    </div>
                </div>
                <span className='Bottom-box'>
                    <span className='owner'>
                        <h3>Owner </h3>
                        <p style={{ paddingLeft: 20 }} className='owner-link'>{user.user_name}</p>
                    </span>

                    <span className='stage'>
                        <h3>Stage</h3>
                        <p className='stage-h3'> {newProject.project_stage}</p>
                    </span>
                </span>
            </div>
            <CreateSubmitButton newProject={newProject} />
        </>
    )
}
export default CreateForm