import ValuesListItem from './ValuesListItem'

const ValuesSet = ({ values, tagName }) => {
    const valuesList = values.map((value,i) => <ValuesListItem key={i + tagName} value={value} tagName={tagName}/>)

    return (
        <>
            <div className='Values-box'>
                <h3>{tagName}</h3>
                <ul className='Values-list'>
                    {valuesList}
                </ul>
            </div>
        </>

    )
}
export default ValuesSet