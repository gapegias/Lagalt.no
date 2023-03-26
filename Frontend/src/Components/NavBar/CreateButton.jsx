import AddIcon from '@mui/icons-material/Add';
import { NavLink } from 'react-router-dom';

const CreateButton = () => {
    return (
        <>
            {/* <div className="Create-button-box"> */}
                <NavLink className='Create-button' to='/submit'>
                    <AddIcon sx={{ fontSize: 60 }}/>
                </NavLink>
            {/* </div> */}
        </>
    )
}
export default CreateButton