// Saves data to the session storage
export const storageSave = (key, value) => {
    sessionStorage.setItem(key, JSON.stringify(value))
}

// Reads data from session storage by a key
export const storageRead = key => {
    const data = sessionStorage.getItem(key)
    if (data) {
        return JSON.parse(data)
    }
    return null
}

// Deletes session storage value by a key
export const storageDelete = key => {
    sessionStorage.removeItem(key)
}