import { useProject } from '../../context/ProjectContext';
import './MessageSet.css'
import RequestSetItem from './RequestSetItem';

const RequestSet = () => {

    const {project, setProject} = useProject()

    const requestList = project.requests.map((request, index)=> <RequestSetItem key={index+"request"} request={request} />)
    return (
                <ul>
                    {requestList}
                </ul>
    )

}
export default RequestSet