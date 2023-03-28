import './MessageSet.css'
import TextsmsIcon from '@mui/icons-material/Textsms';
import MessageSetItem from './MessageSetItem';
import { storageRead, storageSave } from '../../utils/storage';
import { STORAGE_KEY_MESSAGES, STORAGE_KEY_PROJECT, STORAGE_KEY_PROJECTS, STORAGE_KEY_PROJECTS_TO_SHOW, STORAGE_KEY_USER } from '../../const/storageKeys';
import { useForm } from 'react-hook-form';
import { useUser } from '../../context/UserContext'
import { addMessage, getMessageById } from '../../api/messages';
import { addMessageToProject } from '../../api/projects';
import { useMessages } from '../../context/MessagesContext';
import { useProject } from '../../context/ProjectContext';
import { useProjects } from '../../context/ProjectsContext';
import { useProjectsToShow } from '../../context/ProjectsToShowContext';
import { userByName } from '../../api/user';
import { useState } from 'react';

const MessageSet = () => {
  const { register, handleSubmit, resetField } = useForm()
  const { user, setUser } = useUser()
  const { messages, setMessages } = useMessages()
  const { project, setProject } = useProject()
  const { projects, setProjects } = useProjects()
  const { setProjectsToShow } = useProjectsToShow()
  const messageList = project.messages.sort(function (x, y) { return x.message_timestamp - y.message_timestamp }).map((message, index) => <MessageSetItem key={index + "message"} message={message} />)
  const [error, setError] = useState(null)

  const onSend = async (event) => {
    let max = 0
    const maxId = messages.map(m => {
      if (m.message_id > max) {
        max = m.message_id
      }
    })

    let newMessage = {
      message_id: max + 1,
      message_text: event.value,
      message_user_name: user.user_name
    }

    const [messageError, messageResponse] = await addMessage(newMessage)
    if (messageError !== null) {
      setError('Message failed to be sent.')
      return
    }
    const [newMessageError, newMessageResponse] = await getMessageById(max + 1)
    if (newMessageError !== null) {
      setError('Action failed. Failed to retrieve data from database')
      return
    }
    storageSave(STORAGE_KEY_MESSAGES, [...messages, newMessageResponse])
    setMessages(storageRead(STORAGE_KEY_MESSAGES))


    let updatedProject = {
      ...project,
      messages: [...project.messages, newMessageResponse]
    }

    const [projectError, projectResponse] = await addMessageToProject(project, updatedProject.messages)
    if (projectError !== null) {
      setError('Action failed. Failed to add the message to the project')
      return
    }

    storageSave(STORAGE_KEY_PROJECT, updatedProject)
    setProject(updatedProject)
    storageSave(STORAGE_KEY_PROJECTS, [...projects.filter(p => p.project_id !== project.project_id), updatedProject])
    setProjects(storageRead(STORAGE_KEY_PROJECTS))
    storageSave(STORAGE_KEY_PROJECTS_TO_SHOW, storageRead(STORAGE_KEY_PROJECTS))
    setProjectsToShow(storageRead(STORAGE_KEY_PROJECTS))

    const [userError, userResponse] = await userByName(user.user_name)
    if (userError !== null) {
      setError(' Failed to retrieve users data from the database')
      return
    }
    storageSave(STORAGE_KEY_USER, userResponse)
    setUser(userResponse)

    // let projectMessages = messages
    // projectMessages.push(newMessageResponse)

    // setProject(updatedPrResponse)
    // const projects = storageRead(STORAGE_KEY_PROJECTS)
    // let updatedProjects = projects.filter(pr => pr.project_id === project.project_id)
    // storageSave(STORAGE_KEY_PROJECTS, updatedProjects)
    // storageSave(STORAGE_KEY_PROJECTS_SEARCH, updatedProjects)
    resetField("value")

  }




  return (
    <>
      <span className='title-of-box'>Chat history</span>
      <div className='line'></div>
      <div className="Chat-history-box">
        <ul>
          {messageList}
        </ul>
      </div>
      <div className="New-message-box">
        <form onSubmit={handleSubmit(onSend)} className='chat-form'>
          <TextsmsIcon></TextsmsIcon>
          <input className="message-input-box" type="text" defaultValue={""} placeholder='New message...'{...register("value", { required: true })}>

          </input>
          <button className='button-29' type='submit'>
            send
          </button>
        </form>
      </div>
      {error !== null && <div>{error}</div>}
    </>
  )

}
export default MessageSet