import { createHeaders } from "."

const skillsUrl = process.env.REACT_APP_SKILLS_API_URL

// Finds all projects exist in the api
export const findAllSkills = async () => {
    try{
        const response = await fetch(`${skillsUrl}`)
        if(!response.ok){
            throw new Error("Could not fetch skills")
        }
        const data =  await response.json()
          return [null, data];
    }catch(error){
        return[error.message, []]
    }
}


// Creates a new user at the api
export const createSkill = async (skill_name) => {
    try{
        const response = await fetch(skillsUrl, {
            method: 'POST',
            body: JSON.stringify({
                skill_name,
            }),
            headers: createHeaders()
        })
        if(!(response.ok)){
            throw new Error("Could not create Skill with name " + skill_name)
        }
        return[null, skill_name]
    }catch(error){
        return[error.message, []]
    }
}
