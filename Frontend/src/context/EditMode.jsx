import { createContext, useContext, useState } from "react"
import { STORAGE_KEY_EDIT_MODE } from "../const/storageKeys"
import { storageDelete } from "../utils/storage"

const EditModeContext = createContext()

export const useEditMode = () => {
    return useContext(EditModeContext)
}

// Provider -> managing state
const EditModeProvider = ({ children }) => {
    const [editMode, setEditMode] = useState(storageDelete(STORAGE_KEY_EDIT_MODE))
    const state = {
        editMode,
        setEditMode
    }
    return (
        <EditModeContext.Provider value={state}>
            {children}
        </EditModeContext.Provider>
    )
}
export default EditModeProvider