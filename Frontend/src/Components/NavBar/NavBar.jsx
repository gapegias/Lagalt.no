import LogoutButton from './LogoutButton'
import SearchBox from './SearchBox'
import { NavLink} from 'react-router-dom'
import './NavBar.css'
import LoginButton from './LoginButton';
import ProfileIcon from './ProfileIcon';
import CreateButton from './CreateButton';
import { storageSave } from '../../utils/storage';
import { STORAGE_KEY_EDIT_MODE, STORAGE_KEY_PROJECTS_TO_SHOW } from '../../const/storageKeys';
import { useProjects } from '../../context/ProjectsContext';
import { useProjectsToShow } from '../../context/ProjectsToShowContext';
import keycloak from '../../keycloak';
import { ROLES } from '../../const/roles';

const NavBar = ({ }) => {

    const {projects} = useProjects();
    const {setProjectsToShow} = useProjectsToShow();
    

    const onHomeClick = () =>{
        storageSave(STORAGE_KEY_PROJECTS_TO_SHOW,projects)
        setProjectsToShow(projects)
        storageSave(STORAGE_KEY_EDIT_MODE,false)
    }

    return (
        <>
            <div className="Nav-bar">
                <div className='left-Nav-bar'>
                    <NavLink onClick={onHomeClick} className='Home-button-box' to='/'>
                        <div className='logo-box'></div>
                    <img src='lagalt-logo.svg' className='filter-red' alt='logo' style={{width:200}}/>
                    </NavLink>
                </div>
                <SearchBox /> 
                <div className='right-Nav-bar'> 
                    <ProfileIcon />
                    {keycloak.hasRealmRole(ROLES.User) && <CreateButton />}
                    {keycloak.hasRealmRole(ROLES.User) && <LogoutButton />}
                    {!keycloak.hasRealmRole(ROLES.User) && <LoginButton />}
                </div>
            </div>
        </>
    )
}
export default NavBar