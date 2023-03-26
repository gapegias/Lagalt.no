import ProjectSetItem from "./ProjectSetItem"

const ProjectSet = ({projectsToDisplay}) => {


    const projectSet = projectsToDisplay.map((project, index) =>
        <ProjectSetItem  key={project.project_title + " " + index} pr={project} />).sort(function(x,y){return y.project_id - x.project_id })

    return (
        <>
                <div className="Project-set">{projectSet}</div>
        </>
    )
}
export default ProjectSet