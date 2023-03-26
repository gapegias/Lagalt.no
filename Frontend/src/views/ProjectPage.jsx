import NavBar from "../Components/NavBar/NavBar"
import ProjectForm from "../Components/Project/ProjectForm"
import TopicsBar from "../Components/TopicsBar/TopicsBar"
import { useUser } from "../context/UserContext"
import ProjectEditForm from "../Components/Project/ProjectEditForm"
import { useEditMode } from "../context/EditMode"
const ProjectPage = () => {

    const { editMode, setEditMode } = useEditMode()


    console.log(editMode)
    return (
        <>

            <NavBar />
            <div className="Main">
                <div className="Side-bar">
                    <TopicsBar />
                </div>
                <div className="Main-body">

                    {!editMode && <ProjectForm />}

                    
                    {editMode && <ProjectEditForm />}
                </div>
            </div>
        </>
    )
}
export default ProjectPage