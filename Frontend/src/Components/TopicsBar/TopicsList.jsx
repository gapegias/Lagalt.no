import { MenuItem } from 'react-pro-sidebar';
import { Link, useNavigate } from 'react-router-dom';
import { STORAGE_KEY_PROJECTS_TO_SHOW } from '../../const/storageKeys';
import { useIsSearched } from '../../context/IsSearchedContext';
import { useProjectsToShow } from '../../context/ProjectsToShowContext';
import { storageSave } from '../../utils/storage';
import TopicsListItem from './TopicsListItem';

const TopicsList = ({projects }) => {
    const {projectsToShow, setProjectsToShow} = useProjectsToShow();
    const max = projects.length
    const min = projects.length > 5 ? (projects.length - 5) : 0
    const projectByTopicList = projects.slice(min, max).map((project, index) =>
        <TopicsListItem key={index} pr={project} />)
        const navigate = useNavigate()

    const onMoreClick = () => {
        /////mporei na min xreiazetai to prwto
        storageSave(STORAGE_KEY_PROJECTS_TO_SHOW,projects)
        setProjectsToShow(projects)   
        navigate('/')       
    }

    return (
        <>
            {projectByTopicList}
            {/* <h4 className={'more-button'} onClick={onMoreClick}>More</h4> */}
            
            {projects.length > 5 && <MenuItem
                onClick={onMoreClick}
                key={"More_" + projects[0].project_id}
                style={{ height: '20px', padding: '0 5px 0 35px' }}
                component={<Link to="/" />}> More </MenuItem>} 
        </>

    )
}
export default TopicsList