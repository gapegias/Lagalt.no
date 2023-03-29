import { createHeaders } from "."

const requestsUrl = process.env.REACT_APP_REQUESTS_API_URL



export const addRequest = async (request) => {
    try {
        const response = await fetch(`${requestsUrl}`, {
            method: 'POST',
            headers: createHeaders(),
            body: JSON.stringify({
                request_text: request.request_text,
                request_user_id: request.request_user_id,
                request_user_name: request.request_user_name
            })
        })

        if (!response.ok) {
            throw new Error('Could not create the request')
        }

        return [null, request]
    } catch (error) {
        return [error.message, null]
    }

}

// Deletes a request by id from the api
export const deleteRequest = async (requestId) => {
    try{
        const response = await fetch(`${requestsUrl}/${requestId}`, {
            method: 'DELETE',
            headers: createHeaders()
        })
        if(!(response.ok)){
            throw new Error("Could not delete the request")
        }
        return[null, requestId]
    }catch(error){
        return[error.message, []]
    }
}

// Finds all requests exist in the api
export const findAllRequests = async () => {
    try {
      const response = await fetch(`${requestsUrl}`);
      if (!response.ok) {
        throw new Error("Could not fetch requests");
      }
      const data = await response.json();
      return [null, data];
    } catch (error) {
      return [error.message, []];
    }
  };


