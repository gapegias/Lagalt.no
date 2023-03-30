import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./views/HomePage";
import ProfilePage from "./views/ProfilePage";
import ProjectPage from "./views/ProjectPage";
import CreateProjectPage from "./views/CreateProjectPage";
import KeycloakRoute from "./routing/KeycloakRoute";

function App() {
  return (
    <BrowserRouter>
      <div className="App"></div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/project" element={<ProjectPage />} />
        <Route
          path="/profile"
          element={
            <KeycloakRoute redirectTo={"/"}>
              <ProfilePage />
            </KeycloakRoute>
          }
        />
        <Route
          path="/submit"
          element={
            <KeycloakRoute redirectTo={"/"}>
              <CreateProjectPage />
            </KeycloakRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
