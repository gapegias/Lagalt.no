import './SelectInput.css'
import './InputForm.css'
import { useState } from 'react'
import Select from 'react-select'
import AddIcon from '@mui/icons-material/Add';
import InputForm from './InputForm';

const MultiSelectInput = ({ dataToSelect, setData, addData }) => {

  const customStyles = {
    control: (base, state) => ({
      ...base,

      color: "#0C0C1E",
      background: "white",
      width:200
      // match with the menu
      // borderRadius: state.isFocused ? "3px 3px 0 0" : 3,
      // Overwrites the different states of border
      // borderColor: state.isFocused ? "#cb2d3e" : "#0C0C1E",
      // Removes weird border around container
      // boxShadow: state.isFocused ? null : null,
      //   "&:hover": {
      //     // Overwrites the different states of border
      //     borderColor: state.isFocused ? "#cb2d3e" : "#0C0C1E"
      //   }
    }),

    menuList: base => ({
      ...base,
      // kill the white space on first and last option
      padding: 0,
      color: "#0C0C1E",
      // background: "#E4E5E8"
    })
  };


  let options = []
  dataToSelect.map((object, index) => options.push({ value: object, label: object }))


  const [selectedOptions, setSelectedOptions] = useState();
  const [addedValue, setAddedValue] = useState()
  const [isHidden, setIsHidden] = useState(true)
  // const [isSubmitted, setIsSubmitted] = useState(false)

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
    addData(addedValue.toUpperCase())
    // setIsSubmitted(true)
    setIsHidden(true)
  }

  const onCancel = () => {
    setIsHidden(true)
    // setIsSubmitted(false)
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
      {isHidden && <button onClick={onAddClick} className='add-button'>
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
      {/* {!isHidden && !isSubmitted && <RadioButtonUncheckedIcon sx={{ fontSize: 30, color:'#cb2d3e'}}/>}
      {!isHidden && isSubmitted && <CheckCircleOutlineIcon sx={{ fontSize: 30, color:'#1B2E3C' }}/>} */}
    </div>
    </>
  )

}
export default MultiSelectInput