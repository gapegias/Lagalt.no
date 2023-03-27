import { createHeaders } from "./index" 


const userApiUrl = process.env.REACT_APP_USER_API_URL


export const loginUser = async (name) => {
    const [checkError, user] = await userByName(name)     // Checks if there is a user with the given name

    if(checkError !== null){
        console.log('Eroor found')
        const [checkErrorCreate, userCreate] =  await createUser(name)   
        const [checkError, user] = await userByName(name)       
        return   [checkError, user]          // If user does not exist, creates a new user at the api
    }

    if(user !== null && typeof user !== 'undefined'){      // If user already exist
        return [null, user]                                // use users data
    }

}

// Checks if user already exists in the api
export const userByName = async (name) => {
    
    try{
        const response = await fetch(`${userApiUrl}?user_name=${name}`)
        if(!response.ok){
            throw new Error("Could not complete request")
        }
        const data =  await response.json()
          return [null, data];
    }catch(error){
        return[error.message, []]
    }
}

// Creates a new user at the api
const createUser = async (user_name) => {
    try{
        const response = await fetch(userApiUrl, {
            method: 'POST',
            body: JSON.stringify({
                user_name,
                projects:[],
                skills:[],
                user_hide:false,
                user_about_me:""
            }),
            headers: createHeaders()
        })
        if(!(response.ok)){
            throw new Error("Could not create User with name " + user_name)
        }
        return[null, user_name]
    }catch(error){
        return[error.message, []]
    }
}



// Fetching a user by id from the api
export const userById = async (userId) =>{
    try{
            const response = await fetch (`${userApiUrl}/${userId}`)
            if(!response.ok){
                throw new Error('Could not fetch user')
            }
            const user = await response.json()
            return [null, user]
    }catch(error){
        return [error.message, null]
    }
}

// Deletes a user by id at the api
export const deleteUser = async (userId) => {
    try{
        const response = await fetch(`${userApiUrl}/${userId}`, {
            method: 'DELETE',
            headers: createHeaders()
        })
        if(!(response.ok)){
            throw new Error("Could not delete User")
        }

        return[null, userId]
    }catch(error){
        return[error.message, []]
    }
}

// Update a user by id at the api
export const updateUser = async (userId,updatedUser) => {
    try{
        const response = await fetch(`${userApiUrl}/${userId}`, {
            method: 'PATCH',
            headers: createHeaders(),    
            body: JSON.stringify({
                user_id: updatedUser.user_id,
                user_name: updatedUser.user_name,
                user_about_me: updatedUser.user_about_me,
                user_hide: updatedUser.user_hide,
                skills: updatedUser.skills,
                projects: updatedUser.projects
            })
        })
        if(!(response.ok)){
            throw new Error("Could not update User")
        }
        return[null, updatedUser]
    }catch(error){
        return[error.message, []]
    }
}

export const findAllUsers = async () => {
    try {
      const response = await fetch(`${userApiUrl}`);
      if (!response.ok) {
        throw new Error("Could not fetch projects");
      }
      const data = await response.json();
      return [null, data];
    } catch (error) {
      return [error.message, []];
    }
  };