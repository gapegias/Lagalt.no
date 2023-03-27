import LogoutButton from './LogoutButton'
import SearchBox from './SearchBox'
import HomeIcon from '@mui/icons-material/Home';
import { NavLink} from 'react-router-dom'
import './NavBar.css'
import LoginButton from './LoginButton';
import ProfileIcon from './ProfileIcon';
import CreateButton from './CreateButton';
import { useUser } from '../../context/UserContext'
import { storageSave } from '../../utils/storage';
import { STORAGE_KEY_EDIT_MODE, STORAGE_KEY_PROJECTS_TO_SHOW } from '../../const/storageKeys';

import { useProjects } from '../../context/ProjectsContext';
import { useProjectsToShow } from '../../context/ProjectsToShowContext';
import keycloak from '../../keycloak';

const NavBar = ({ }) => {

    const { user } = useUser()
    const {projects, setProjects} = useProjects();
    const {projectsToShow, setProjectsToShow} = useProjectsToShow();
    

    const onHomeClick = () =>{
        storageSave(STORAGE_KEY_PROJECTS_TO_SHOW,projects)
        setProjectsToShow(projects)
        storageSave(STORAGE_KEY_EDIT_MODE,false)
        // setIsSearched(true)
    }

    return (
        <>
            <div className="Nav-bar">
                <div className='left-Nav-bar'>
                    <NavLink onClick={onHomeClick} className='Home-button-box' to='/'>
                        <HomeIcon sx={{ fontSize: 60 }}/>
                    </NavLink>
                    <ProfileIcon />
                </div>
                <SearchBox /> 
                <div className='right-Nav-bar'> 
                    {keycloak.authenticated && <CreateButton />}
                    {keycloak.authenticated && <LogoutButton />}
                    {!keycloak.authenticated && <LoginButton />}
                </div>
            </div>
        </>
    )
}
export default NavBar