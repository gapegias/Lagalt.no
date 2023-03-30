import { useState } from "react"
import { createSkill } from "../api/skills"
import CreateForm from "../Components/CreateProject/CreateForm"
import NavBar from "../Components/NavBar/NavBar"
import TopicsBar from "../Components/TopicsBar/TopicsBar"
import { STORAGE_KEY_SKILLS} from "../const/storageKeys"
import { useSkills } from "../context/SkillsContext"
import { storageRead, storageSave } from "../utils/storage"

const CreateProjectPage = () => {
  const {skills, setSkills} = useSkills()
  const [error, setError] = useState(null)

  const addSkills = async (newSkill) => {
    const exists = skills.some((skill) => {
        return (skill.skill_name.toUpperCase() === newSkill.toUpperCase())       //checks if new skill is already existed
    })

    if (!exists) {
        const [error, response] = await createSkill(newSkill.toUpperCase())      // Saves new skill to the API
        if(error !== null){
          setError("New skill is not created")
          return
        }

        storageSave(STORAGE_KEY_SKILLS, [...skills, {
            skill_id: skills.length +1,                                          // Save new skill to session storage
            skill_name: newSkill
        }])
        setSkills(storageRead(STORAGE_KEY_SKILLS))
    }
    else {
        alert('Skill ' + newSkill + ' is already existed')
    }
}


  return (
    <>

      <NavBar  />
      <div className="Main">
        <div className="Side-bar">
          <TopicsBar/>
        </div>
        <div className="Main-body">
          <CreateForm addSkills={addSkills} />
          
        </div>
      </div>

      {error !== null && <div>{error}</div>}
    </>
  )
}
export default CreateProjectPage