import { useState } from 'react'
import { createSkill } from '../../api/skills'
import { STORAGE_KEY_SKILLS } from '../../const/storageKeys'
import { useSkills } from '../../context/SkillsContext'
import { useUser } from '../../context/UserContext'
import { storageRead, storageSave } from '../../utils/storage'
import MultiSelectInput from '../Forms/MultiSelectInput'
import TextAreaForm from '../Forms/TextAreaForm'
import './ProfileForm.css'
import ProfileSubmitButton from './ProfileSubmitButton'
import CheckBox from '../Forms/CheckBox';

import ValuesSet from './ValuesSet'
import InputForm from '../Forms/InputForm'
const ProfileEditForm = () => {

    const { user } = useUser()
    const { skills, setSkills } = useSkills()
    const [nameInput, setNameInput] = useState()
    const [aboutMeInput, setAboutMeInput] = useState()
    const [skillsInput, setSkillsInput] = useState([])
    const [hideInput, setHideInput] = useState()
    const [error, setError] = useState(null)


    const setAboutMe = (text) => {
        setAboutMeInput(text)
    }

    const setName = (name) => {
        setNameInput(name)
    }

    const setSkillsIn = (skills) => {
        setSkillsInput(skills)
    }

    const setHide = (stage) => {
        setHideInput(stage)
    }

    const addSkills = async (newSkill) => {
        let exists = skills.some((skill) => {
            return (skill.skill_name.toLowerCase() === newSkill.toLowerCase())       //checks if new skill is already existed
        })

        if (!exists) {
            const [error, response] = await createSkill(newSkill.toUpperCase())      // Saves new skill to the API
            if (error !== null) {
                setError('Failed to create new skill.')
                return
            }

            storageSave(STORAGE_KEY_SKILLS, [...skills, {
                skill_id: skills.length,                                             // Save new skill to session storage
                skill_name: newSkill
            }])
            setSkills(storageRead(STORAGE_KEY_SKILLS))
        }
        else {
            alert('Skill ' + newSkill + ' is already existed')
        }


    }

    const skillsNames = [...new Set(skills.map(skill => skill.skill_name))]
    const userSkillsNames = [...new Set(user.skills.map(skill => skill.skill_name))]

    const newSkills = skillsInput.map((skillName,i) => {
        console.log(skills.filter((skill) => skill.skill_name === skillName)[0].skill_id)
        return {
            skill_id: skills.filter((skill) => skill.skill_name === skillName)[0].skill_id,
            skill_name: skillName
        }
    })

    console.log(newSkills)

    const updatedUser = {
        user_id: user.user_id,
        user_name: user.user_name,
        user_name: (typeof nameInput === (("undefined") || "")) ? user.user_name : nameInput,
        user_about_me: (typeof aboutMeInput === (("undefined") || "")) ? user.user_about_me : aboutMeInput,
        user_hide: (typeof hideInput === (("undefined") || "")) ? user.user_hide : hideInput,
        skills: ((newSkills.length === 0)) ? user.skills : newSkills,
        projects: user.projects
    }

    console.log(updatedUser)



    return (
        <>
            <div className='Project-form-box'>
                <div className='Name-box'>
                    <div className='name-title-edit-box'>
                        <h2> {user.user_name}</h2>
                    </div>
                    <CheckBox setHide={setHide} tagName="Hide info" />
                </div>
                <div className='Body-box'>
                    <div className='About-me-box'>
                        <p>About me</p>
                        <p>(Old) {user.user_about_me}</p>
                        <TextAreaForm setValue={setAboutMe} />
                    </div>
                    <div className='Skills-box'>
                        <ValuesSet values={userSkillsNames} tagName="Old Skills" />
                        <MultiSelectInput dataToSelect={skillsNames} setData={setSkillsIn} addData={addSkills} />
                        <ValuesSet values={skillsInput} tagName="New Skills" />
                    </div>
                </div>
            </div>
            <ProfileSubmitButton updatedUser={updatedUser} />
            {error !== null && <div>{error}</div>}
        </>
    )
}
export default ProfileEditForm