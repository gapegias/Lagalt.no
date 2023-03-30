
import { useForm } from 'react-hook-form'
import './InputForm.css'
const InputForm = ({setValue}) => {
  const {register, handleSubmit}=useForm()

  const onSubmit=(event)=>{
    setValue(event.value)
}
  return (
    <>
    <form  onChange={handleSubmit(onSubmit)}>
        <input  className="effect-2" type="text" placeholder="Please enter"{...register("value")} required/>
   </form>
    </>
  )

}
export default InputForm








