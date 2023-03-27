import { useState } from "react";
import { createHeaders } from ".";
// import { createHeaders } from "./index";

const projectsUrl = process.env.REACT_APP_PROJECTS_API_URL;


export const addProject = async (project) => {
  console.log(project.project_title)
  const [checkError, projectResponse] = await checkForProject(project.project_title)     // Checks if there is a user with the given name

  if(checkError !== null){
    console.log("checkError")
      return [checkError, []]
  }

  return await createProject(project)                       // If user does not exist, creates a new user at the api
}


export const checkForProject = async (title) => {
  try{
      const response = await fetch(`${projectsUrl}?project_title=${title}`)
      if(!response.ok){
          throw new Error("Could not complete request")
      }
      const data =  await response.json()
      console.log(data)
      return [null, data];
  }catch(error){
      return[error.message, []]
  }
}


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

      const result = await response.json()
      return [null, result]
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

export const addMemberToProject = async (project, member) => {
  try {
    const response = await fetch(`${projectsUrl}/${project.id}`, {
      method: "PATCH",
    //   headers: createHeaders(),
      body: JSON.stringify({
        members: [...project.members, member],
      }),
    });

    if (!response.ok) {
      throw new Error("Could not add the member to the project");
    }

    const result = await response.json();
    return [null, result];
  } catch (error) {
    return [error.message, null];
  }
};


// Deletes a request by id from the project
export const deleteRequestFromProject = async (projectId, requestId) => {
  try {
    const response = await fetch(
      `${projectsUrl}/${projectId}/requests/${requestId}`,
      {
        method: "DELETE",
        // headers: createHeaders(),
      }
    );
    if (!response.ok) {
      throw new Error("Could not delete the request");
    }
    const data = await response.json();
    return [null, data];
  } catch (error) {
    return [error.message, []];
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
      throw new Error("Could not update the project");
    }
    const result = await response.json();

    return [null, result];
  } catch (error) {
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

    const result = await response.json();
    return [null, result];
  } catch (error) {
    return [error.message, null];
  }
};

export const addRequestToProject = async (project, requests) => {
  try {
    const response = await fetch(`${projectsUrl}/${project.project_id}`, {
      method: "PATCH",
      headers: createHeaders(),
      body: JSON.stringify({
        project_id:project.project_id,
        requests: requests,
      }),
    });

    if (!response.ok) {
      throw new Error("Could not add the message to the project");
    }

    const result = await response.json();
    return [null, result];
  } catch (error) {
    return [error.message, null];
  }
};
