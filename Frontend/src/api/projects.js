import { useState } from "react";
import { createHeaders } from ".";
// import { createHeaders } from "./index";

const projectsUrl = process.env.REACT_APP_PROJECTS_API_URL;

export const createProject = async (project) => {
  try {
      const response = await fetch(`${projectsUrl}`, {
          method: 'POST',
          headers: createHeaders(),
          body: JSON.stringify({
            project_title: project.project_title,
            project_topic: project.project_topic,
            project_owner: project.project_owner,
            project_purpose: project.project_purpose,
            project_stage: 'Initial',
            project_repo_url: project.project_repo_url,
            skills: project.skills,
            messages: [],
            requests: [],
            users: project.users
          })
      })

      if (!response.ok) {
          throw new Error ( 'Could not create the project')
      }

      return [null, project]
  }catch (error) {
      return [error.message, null]
  }
}


// Finds all projects exist in the api
export const findAllProjects = async () => {
  try {
    const response = await fetch(`${projectsUrl}`);
    if (!response.ok) {
      throw new Error("Could not fetch projects");
    }
    const data = await response.json();
    return [null, data];
  } catch (error) {
    return [error.message, []];
  }
};

// Fetching a project by id from the api
export const getProjectById = async (projectId) => {
  try {
    const response = await fetch(`${projectsUrl}/${projectId}`);
    if (!response.ok) {
      throw new Error("Could not fetch project");
    }
    const project = await response.json();
    return [null, project];
  } catch (error) {
    return [error.message, null];
  }
};


// Clears all the translations of a user by id at the api
export const updateProject = async (project) => {
  try {
    const response = await fetch(`${projectsUrl}/${project.project_id}`, {
      method: "PATCH",
      headers: createHeaders(),
      body: JSON.stringify({
        project_id: project.project_id,
        project_title: project.project_title,
        project_topic: project.project_topic,
        project_owner: project.project_owner,
        project_purpose: project.project_purpose,
        project_stage: project.project_stage,
        project_repo_url: project.project_repo_url,
        skills: project.skills,
        messages: project.messages,
        requests: project.requests,
        users: project.users
      }),
    });

    if (!response.ok) {
      console.log('Respons not ok')
      throw new Error("Could not update the project");
    }
    // const result = await response.json();

    return [null, project];
  } catch (error) {
    console.log('Respons not ok (Catch)')
    return [error.message, null];
  }
};


export const addMessageToProject = async (project, messages) => {
  try {
    const response = await fetch(`${projectsUrl}/${project.project_id}`, {
      method: "PATCH",
      headers: createHeaders(),
      body: JSON.stringify({
        project_id:project.project_id,
        messages: messages,
      }),
    });

    if (!response.ok) {
      throw new Error("Could not add the message to the project");
    }


    return [null, messages];
  } catch (error) {
    return [error.message, null];
  }
};

export const projectByName = async (title) => {
    
  try{
      const response = await fetch(`${projectsUrl}?project_title=${title}`)
      if(!response.ok){
          throw new Error("Could not complete request")
      }
      const data =  await response.json()
        return [null, data];
  }catch(error){
      return[error.message, []]
  }
}

