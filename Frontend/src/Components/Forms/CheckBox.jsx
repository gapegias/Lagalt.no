import { useRef } from 'react';
import { useUser } from '../../context/UserContext';
const CheckBox = ({ setHide, tagName }) => {

    const checkbox = useRef()
    const {user}=useUser()

    const handleClick = () => {
        setHide(checkbox.current.checked)
    }

    return (
        <>
            <div>
                {tagName}
                <div className='checkbox-wrapper'>

                    <input onChange={handleClick}
                        type="checkbox"
                        name="js"
                        ref={checkbox}
                        defaultChecked={user.user_hide ? 'checked' : ''}
                    />
                </div>
            </div>

        </>
    )
}
export default CheckBox