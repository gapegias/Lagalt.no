import SearchIcon from '@mui/icons-material/Search';
import {useForm} from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useProjects } from '../../context/ProjectsContext';
import { useProjectsToShow } from '../../context/ProjectsToShowContext';
const SearchBox = ({ }) => {
    const {register, handleSubmit,resetField}=useForm()
    const navigate = useNavigate()
    const {projects, setProjects} = useProjects()
    const {projectsToShow, setProjectsToShow} = useProjectsToShow();
    const onSubmit=(event)=>{
        let projectsBySearch = projects.filter(project => project.project_title.toLowerCase().includes(event.search.toLowerCase()) ||
                                                        project.project_topic.toLowerCase().includes(event.search.toLowerCase()));
        setProjectsToShow(projectsBySearch)
        resetField("value")
        navigate('/')
    }

    return (
        <>
            <form  onSubmit={handleSubmit(onSubmit)} className="searchBox">
                <input  className="searchInput" defaultValue={""} type="text" placeholder="Search..." {...register("search")}/>
                    <button className="searchButton" type='submit'>
                        <SearchIcon />
                    </button>
            </form>
            
        </>
    )
}
export default SearchBox