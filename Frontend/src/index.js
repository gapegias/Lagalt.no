import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import AppContext from "./context/AppContext";
import { ProSidebarProvider } from "react-pro-sidebar";
import { storageSave } from "./utils/storage";
import { STORAGE_KEY_EDIT_MODE, STORAGE_KEY_MESSAGES, STORAGE_KEY_PROJECT, STORAGE_KEY_PROJECTS, STORAGE_KEY_PROJECTS_TO_SHOW, STORAGE_KEY_REQUESTS, STORAGE_KEY_SKILLS, STORAGE_KEY_USERS } from "./const/storageKeys";
import { initialize } from "./keycloak";

const root = ReactDOM.createRoot(document.getElementById("root"));
storageSave(STORAGE_KEY_PROJECTS_TO_SHOW,[])
storageSave(STORAGE_KEY_PROJECTS,[])
storageSave(STORAGE_KEY_PROJECT,[])
storageSave(STORAGE_KEY_MESSAGES,[])
storageSave(STORAGE_KEY_REQUESTS,[])
storageSave(STORAGE_KEY_SKILLS,[])
storageSave(STORAGE_KEY_EDIT_MODE,false)

initialize().then(() => {

root.render(
  // <React.StrictMode>
    <AppContext>
      <ProSidebarProvider>
        <App />
      </ProSidebarProvider>
    </AppContext>
  // {/* </React.StrictMode> */}
);})
.catch(() => {
  root.render(
    <h1>Could not connect to KeyCloak server. </h1>
  )
})


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
