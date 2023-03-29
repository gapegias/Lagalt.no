import ProjectSetItem from "./ProjectSetItem"

const ProjectSet = ({projectsToDisplay}) => {


    const projectSet = projectsToDisplay.sort((a, b) => b.project_id - a.project_id).map((project, index) =>
        <ProjectSetItem  key={project.project_title + " " + index} pr={project} />)

    return (
        <>
                <div className="Project-set">{projectSet}</div>
        </>
    )
}
export default ProjectSet