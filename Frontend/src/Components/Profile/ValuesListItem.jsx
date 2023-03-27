const ValuesListItem = ({ value }) => {

    return (
        <>
            <li key={value + "li"}>
                <div key={value + "div"} className='Values-item'>
                    {value}
                </div>
            </li>
        </>

    )
}
export default ValuesListItem