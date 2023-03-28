import LogoutButton from './LogoutButton'
import SearchBox from './SearchBox'
import HomeIcon from '@mui/icons-material/Home';
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
import { WidgetsSharp } from '@mui/icons-material';

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
                        {/* <HomeIcon sx={{ fontSize: 60 }}/> */}
                    </NavLink>
                </div>
                <SearchBox /> 
                <div className='right-Nav-bar'> 
                    <ProfileIcon />
                    {keycloak.authenticated && <CreateButton />}
                    {keycloak.authenticated && <LogoutButton />}
                    {!keycloak.authenticated && <LoginButton />}
                </div>
            </div>
        </>
    )
}
export default NavBar