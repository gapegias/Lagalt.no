# **Lagalt.no-Project**

<details>
  <summary><b><h2>Contributors</h2></b></summary><blockquote>
  
  * George Tzafilkos
  * George Pegias 
  * Nomikos Kampourakis
  * Giannis Tripodis
</details>
  
<details>
  <summary><b><h2>Idea</h2></b></summary><blockquote>
  
  Create a website which it will be similar to reddit website (link: https://www.reddit.com).
  It will have communities for users who have interest in **music**, **films**, **game** and **web development** (contain existing projects) and
  will offer the capability of both extending existing as well as creating new communities according to users’ interests.

  See website here: 
</details>

<details>
  <summary><b><h2>Set Up Development Environment</h2></b></summary><blockquote>
  
  Make sure you have the following tools available.
  
  <details>
    <summary><b><h3>Backend</h3></b></summary><blockquote>
  
    1. IntelliJ (with Java 17) using:
        * Spring Web
        * Spring Data JPA
        * PostgreSQL
        * Lombok
    2. PostgreSQL (with PgAdmin)
    3. Docker
  </details>
  
  <details>
    <summary><b><h3>Frontend</h3></b></summary><blockquote>
  
    1. NPM/Node.js (LTS – Long Term Support version)
    2. React CRA (create-react-app)
    3. Visual Studio Code Text Editor/ IntelliJ
    4. Browser Developer Tools for testing and debugging
  </details> 
</details>

<details>
  <summary><b><h2>Requirements For Lagalt.no-Project</h2></b></summary><blockquote>
  
  <details>
    <summary><b><h3>Primary Goal</h3></b></summary><blockquote>
  
    Understanding social network users’ needs, especially reddit, and find them efficient solutions.
  </details>
  
  <details>
    <summary><b><h3>Complexity Level</h3></b></summary><blockquote>
  
    Basic development, creating a <b>database</b>, an <b>API</b> and a <b>website</b> that makes requests on it.
  </details>
      
  <details>
    <summary><b><h3>Roles</h3></b></summary><blockquote>
  
    * <b>Non-login user</b> can navigate through pages without joining projects’ chats and seeing fewer information about them.
    * <b>Login user</b> has the same rights as a **non-login user** and much more like making requests to join projects, so they can be added to them or even create their own projects. A <b>login user</b> can be:
    * <b>Project member</b> and they have access to other projects’ information like files repository and chat.
    * <b>Project owner</b> and they can add users after a request, remove users, change projects’ information and even delete projects. We decided to add a field called <b>stage</b> to project table, which will be initiazed to <b>"initial"</b> when a project is created and change to <b>"completed"</b> when it ends instead of deleting it.
  </details>
      
  <details>
    <summary><b><h3>Website’s View</h3></b></summary><blockquote>
  
    * Home page
    * Profile page
    * Project page
    * Create-project page
    
  </details>
</details>

## **Database Schema**

We follow the architecture in the below picture. There are:
- 5 tables and these are:
    - lagalt_user
    - project
    - skill
    - message
    - request 
- and 5 join tables (which represent the Many To Many relationship in 2 tables) and these are:
    - lagalt_user_skills (owner lagalt_user)
    - lagalt_user_projects (owner project)
    - project_skills (owner project)
    - message_projects (owner project)
    - request_projects (owner project)

<img src="/pictures/Entity_Diagram_Dark_Mode.png">

## **API URLs & Requests**
For each table we created an api endpoint to fetch and manipulate database's data. The endpooints and their requests are (prefix: https://woozy-agreement-production-a098.up.railway.app):
- usersUrl: https://woozy-agreement-production-a098.up.railway.app/users

<img src="/pictures/user_requests.PNG">

- projectsUrl: https://woozy-agreement-production-a098.up.railway.app/projects

<img src="/pictures/project_requests.PNG">

- skillsUrl: https://woozy-agreement-production-a098.up.railway.app/skills

<img src="/pictures/skill_requests.PNG">

- messagesUrl: https://woozy-agreement-production-a098.up.railway.app/messages

<img src="/pictures/message_requests.PNG">

- requestsUrl: https://woozy-agreement-production-a098.up.railway.app/requests

<img src="/pictures/request_requests.PNG">

## **Architecture layers to build the database and create API**

We define that everything is separated in layers, and the upper layers are abstractions of the lower ones, that's why every layer should only reference the immediate lower layer. See the below picture.

<img src="/pictures/backend_architecture.png">

- **Models:** They are the objects that contain all the data logic. Basically, they are the tables of our database.
- **Repositories:** They are the objects that are gateways between our business layer and data mapping layer, which is the layer that accesses the database and does the operations. Basically, they are an abstraction to our database access.
- **DTOs:** Data Transfer Objects are objects that carry data between processes in order to reduce the number of methods calls. Their main purpose is to reduce roundtrips to the server by batching up multiple parameters in a single call.
- **Services:** They are the objects that provide an API to our business logic and they are the only ones with access to the repositories. Otherwise, they violate the Dependency Inversion Principle (D in SOLID). 
- **Controllers:** They are the objects that are work as gateways between your input and the business logic, they decide what to do with the input and how to output the response.
