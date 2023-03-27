import './LoginForm.css'
import { STORAGE_KEY_USER, STORAGE_KEY_USER_PROFILE } from '../../const/storageKeys'
import { useUser } from '../../context/UserContext'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { loginUser } from '../../api/user'
import { storageSave } from '../../utils/storage'
import { useUserProfile } from '../../context/UserProfileContext'


const usernameConfig = {                    // Input validation properties
    required: true,
    minLength: 3,
    maxLength: 50
}

const LoginForm = () => {

    const { register, handleSubmit, formState: { errors } } = useForm()
    const { setUser } = useUser()
    const { setUserProfile } = useUserProfile()

    const [apiError, setApiError] = useState(null)

    const onSubmit = async ({ username }) => {
        const [error, userResponse] = await loginUser(username)
        if (error !== null) {
            setApiError(error)
        }
        if (userResponse !== null && userResponse.length !== 0) {          // If there is not an error and user logged in
            storageSave(STORAGE_KEY_USER, userResponse)  
            storageSave(STORAGE_KEY_USER_PROFILE, userResponse)                  // saves user's data to the session storage
            setUser(userResponse)    
            setUserProfile(userResponse)                                      // sets user's data with the logged in user's data
        }
        if (userResponse.length === 0) {
            alert("Username not found! You have to register")
        }
    }



    // Render Functions
    const errorMessage = (() => {           // Validation check of the input value of
        if (!errors.username)               // username's input filed
            return null

        if (errors.username.type === 'required')        // At east one char
            return <span>Username is required</span>

        if (errors.username.type === 'minLength')       // min 3 chars
            return <span>Username is too short</span>

        if (errors.username.type === 'maxLength')       // max 12 chars
            return <span>Username is too big</span>
    })();


    return (
        <>
            <div className='Login-form-box'>
                <div className='Login-form-header-box'>
                    <h2>Login</h2>
                </div>
                <div className='Login-form-body-box'>
                    <form onSubmit={handleSubmit(onSubmit)} >
                        <fieldset >
                            <input
                                type="text"
                                placeholder="What's your name?"
                                {...register("username", usernameConfig)} />
                            <button className="button-29" type="submit" >Submit
                            </button>
                        </fieldset>
                    </form>
                    <p className='Error-message'>{errorMessage} {apiError}</p>
                </div>
            </div>

        </>
    )
}
export default LoginForm