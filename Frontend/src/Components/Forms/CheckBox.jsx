import { useRef } from 'react';
const CheckBox = ({ setHide, tagName }) => {

    const checkbox = useRef()

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
                    />
                </div>
            </div>

        </>
    )
}
export default CheckBox