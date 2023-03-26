import { createHeaders } from "."

const messagesUrl = process.env.REACT_APP_MESSAGES_API_URL


export const addMessage = async (message) => {
    try {
        const response = await fetch(`${messagesUrl}`, {
            method: 'POST',
            headers: createHeaders(),
            body: JSON.stringify({
                message_text:message.message_text,
                message_user_name: message.message_user_name
            })
        })

        if (!response.ok) {
            throw new Error ( 'Could not create the message')
        }

        return [null, message]
    }catch (error) {
        return [error.message, null]
    }
}

export const deleteMessage = async (messageId) => {
    try{
        const response = await fetch(`${messagesUrl}/${messageId}`, {
            method: 'DELETE',
            headers: createHeaders()
        })
        if(!(response.ok)){
            throw new Error("Could not delete the message")
        }
        return[null, messageId]
    }catch(error){
        return[error.message, []]
    }
}

// Finds all messages exist in the api
export const findAllMessages = async () => {
    try {
      const response = await fetch(`${messagesUrl}`);
      if (!response.ok) {
        throw new Error("Could not fetch messages");
      }
      const data = await response.json();
      return [null, data];
    } catch (error) {
      return [error.message, []];
    }
  };


  // Fetching a project by id from the api
export const getMessageById = async (messageId) => {
    try {
      const response = await fetch(`${messagesUrl}/${messageId}`);
      if (!response.ok) {
        throw new Error("Could not fetch message");
      }
      const data = await response.json();
      return [null, data];
    } catch (error) {
      return [error.message, null];
    }
  };