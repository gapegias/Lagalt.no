
import NavBar from "../Components/NavBar/NavBar"
import ProfileEditForm from "../Components/Profile/ProfileEditForm"
import ProfileForm from "../Components/Profile/ProfileForm"
import ProjectSet from "../Components/Project/ProjectSet"
import TopicsBar from "../Components/TopicsBar/TopicsBar"
import withAuth from "../hoc/withAuth"
import { useEditMode } from "../context/EditMode"
import { useUser } from "../context/UserContext"
import { useState } from "react"
import { useUserProfile } from "../context/UserProfileContext"
import { useProjects } from "../context/ProjectsContext"

const ProfilePage = () => {

  const { user, setUser } = useUser()
  const { userProfile, setUserProfile } = useUserProfile()
  const { editMode, setEditMode } = useEditMode()

  const onEdit = () => {
    setEditMode(true)
  }

  const canEdit = (user.user_name === userProfile.user_name)? true:false
  const hideProjects = () => {
    if ((user.user_name !== userProfile.user_name) && (userProfile.user_hide)) {
        return false
    }
    return true
}



  return (
    <>
      <NavBar />
      <div className="Main">
        <div className="Side-bar">
          <TopicsBar />
        </div>
        <div className="Main-body">
          {!editMode && <ProfileForm />}
          {!editMode && canEdit && <div className='button-profile-bottom-box'>
            <button onClick={onEdit} className='button-29' type='submit'  >Edit</button>
          </div>}
          {!editMode && hideProjects() &&  <ProjectSet  projectsToDisplay={userProfile.projects} />}
          {editMode && <ProfileEditForm  />}
        </div>
      </div>


    </>
  )
}
export default ProfilePage