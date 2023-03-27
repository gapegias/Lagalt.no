import './SelectInput.css'
import './InputForm.css'
import { useState } from 'react'
import Select from 'react-select'
import AddIcon from '@mui/icons-material/Add';
import InputForm from './InputForm';

const MultiSelectInput = ({ dataToSelect, setData, addData, noAddNew }) => {

  const customStyles = {
    control: (base, state) => ({
      ...base,

      color: "#0C0C1E",
      background: "white",
      width: 200
    }),

    menuList: base => ({
      ...base,
      // kill the white space on first and last option
      padding: 0,
      color: "#0C0C1E",
    })
  };

  const showAddMoreButton = (noAddNew) ? false : true

  let options = []
  dataToSelect.map((object, index) => options.push({ value: object, label: object }))


  const [selectedOptions, setSelectedOptions] = useState();
  const [addedValue, setAddedValue] = useState()
  const [isHidden, setIsHidden] = useState(true)

  const setValue = (value) => {
    setAddedValue(value)
  }

  const onChange = (event) => {
    setSelectedOptions(event)
    setData(event.map((event) => event.value))
  }
  const onAddClick = () => {
    setIsHidden(false)
  }

  const onSubmit = () => {
    if (addedValue === null || typeof addedValue === 'undefined' || addedValue === "") {
      alert('You must input at least one character')
    } else {

      addData(addedValue.toUpperCase())
    }
    setIsHidden(true)
  }

  const onCancel = () => {
    setIsHidden(true)
  }


  return (
    <>
      <div className='select-form-box'>
        {isHidden && <Select
          styles={customStyles}
          options={options}
          defaultValue={''}
          isSearchable={true}
          className="basic-multi-select"
          classNamePrefix="select"
          value={selectedOptions}
          onChange={onChange}
          isMulti
        />}
        {!isHidden && <InputForm setValue={setValue} ></InputForm>}
        {isHidden && showAddMoreButton && <button onClick={onAddClick} className='add-button'>
          <AddIcon sx={{ fontSize: 30 }} />
        </button>}
        {!isHidden && <div className='select-buttons-box'>
          <button onClick={onSubmit} className='add-button'>
            submit
          </button>
          <button onClick={onCancel} className='add-button'>
            cancel
          </button>
        </div>}
      </div>
    </>
  )

}
export default MultiSelectInput