
import { MenuItem } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import { STORAGE_KEY_EDIT_MODE, STORAGE_KEY_PROJECT } from '../../const/storageKeys';
import { useEditMode } from '../../context/EditMode';
import { useProject } from '../../context/ProjectContext';
import { storageSave } from '../../utils/storage';

const TopicsListItem = ({ pr}) => {
    const {project, setProject} = useProject()
    const { editMode, setEditMode } = useEditMode()

    const onSelect = () => {
        storageSave(STORAGE_KEY_PROJECT,pr)
        setProject(pr)
        storageSave(STORAGE_KEY_EDIT_MODE,false)
        setEditMode(false)
    }

    return (
        <>
            <MenuItem onClick={onSelect}  style={{height:'20px',  padding: '0 5px 0 35px'}} component={<Link to="/project" />}> {pr.project_title} </MenuItem>
        </>

    )
}
export default TopicsListItem