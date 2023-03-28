
import { useForm } from 'react-hook-form'
import './InputForm.css'
const TextAreaForm = ({setValue}) => {
  const {register, handleSubmit}=useForm()

  const onSubmit=(event)=>{
    setValue(event.value)
}
  return (
    <>
    <form  onChange={handleSubmit(onSubmit)}>
        <textarea  type="text" placeholder="Please enter"{...register("value")}/>
   </form>
    </>
  )

}
export default TextAreaForm








