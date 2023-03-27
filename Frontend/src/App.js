import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./views/HomePage";
import ProfilePage from "./views/ProfilePage";
import ProjectPage from "./views/ProjectPage";
import CreateProjectPage from "./views/CreateProjectPage";
import { useEffect, useState } from "react";
import { storageRead } from "./utils/storage";
import { STORAGE_KEY_PROJECTS_SEARCH } from "./const/storageKeys";


function App() {


  return (
    <BrowserRouter>
      <div className="App"></div>
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              // onSearch={onSearch}
              // isSearched={isSearched}
              // projectsToShow={projectsToShow}
              // setProjectsToShow={setProjectsToShow}
            />
          }
        />
        <Route
          path="/project"
          element={
              <ProjectPage  />
          }
        />
        <Route path="/profile" element={<ProfilePage  />} />
        <Route
          path="/submit"
          element={<CreateProjectPage  />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
