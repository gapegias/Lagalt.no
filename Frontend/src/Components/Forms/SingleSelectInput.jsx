import './SelectInput.css'
import './InputForm.css'
import React, { useState } from 'react'
import Select from 'react-select'
import AddIcon from '@mui/icons-material/Add';
import InputForm from './InputForm';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';


const SelectInput = ({ dataToSelect, setData, addData }) => {

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



  let options = []
  dataToSelect.map((object, index) => options.push({ value: object, label: object }))


  const [userChoice, setUserChoice] = useState()
  const [addedValue, setAddedValue] = useState()
  const [isHidden, setIsHidden] = useState(true)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const setValue = (value) => {
    setAddedValue(value)
  }

  const onChange = (event) => {
    setUserChoice(event.value)
    setData(event.value)

  }

  const onAddClick = () => {

    setIsHidden(!isHidden)
  }

  const onSubmit = () => {
    if (addedValue === null || typeof addedValue === 'undefined' || addedValue === "") {
      alert('You must input at least one character')
    } else {

      setData(addedValue.toUpperCase())
      setIsSubmitted(true)
    }
  }

  const onCancel = () => {
    setIsHidden(!isHidden)
    setIsSubmitted(false)
  }



  // const { state.selectedOptions } = state;
  return (
    <>
      {isHidden && <Select
        styles={customStyles}
        options={options}
        isSearchable={true}
        className="basic-multi-select"
        classNamePrefix="select"
        value={options.find(obj => obj.value === userChoice)}
        onChange={onChange}
      />}
      {!isHidden && <InputForm setValue={setValue} ></InputForm>}
      {isHidden && <button onClick={onAddClick} className='add-button'>
        {addData && <AddIcon sx={{ fontSize: 30 }} />}
      </button>}
      <div className='button-circle-box'>
        {!isHidden && <div className='select-buttons-box'>
          <button onClick={onSubmit} className='add-button'>
            submit
          </button>
          <button onClick={onCancel} className='add-button'>
            cancel
          </button>
        </div>}
        {!isHidden && !isSubmitted && <RadioButtonUncheckedIcon sx={{ fontSize: 30, color: '#cb2d3e' }} />}
        {!isHidden && isSubmitted && <CheckCircleOutlineIcon sx={{ fontSize: 30, color: '#E4E5E8' }} />}
      </div>
    </>
  )

}
export default SelectInput