import AddIcon from '@mui/icons-material/Add';
import { NavLink } from 'react-router-dom';

const CreateButton = () => {
    return (
        <>
                <NavLink className='Create-button' to='/submit'>
                    <AddIcon sx={{ fontSize: 60 }}/>
                </NavLink>
        </>
    )
}
export default CreateButton