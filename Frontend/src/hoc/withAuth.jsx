import{ Navigate } from 'react-router-dom'
import{ useUser} from '../context/UserContext'

const withAuth = Component => props => {
    const {user} = useUser()
    if(user !== null){                      // If there is a user
        return <Component {...props} />     // stays at the current page
    }else{                                  // If there is no user
        alert("Unauthorized action! Login first.")
        return <Navigate to="/" />          // navigates to login page
    }
}
export default withAuth