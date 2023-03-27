const topicsUrl = process.env.REACT_APP_TOPICS_API_URL

// Finds all topics exist in the api
export const findAllTopics = async () => {
    try{
        const response = await fetch(`${topicsUrl}`)
        if(!response.ok){
            throw new Error("Could not fetch topics")
        }
        const data =  await response.json()
        console.log(data)
        return[null, data]
    }catch(error){
        return[error.message, []]
    }
}