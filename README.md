# **Lagalt.no-Project**

## Contributors:
 - George Tzafilkos
 - George Pegias 
 - Nomikos Kampourakis
 - Giannis Tripodis
 
## **Idea**
Create a website which it will be similar to reddit website (link: https://www.reddit.com).
It will have communities for users who have interest in **music**, **films**, **game** and **web development** (contain existing projects) and
will offer the capability of both extending existing as well as creating new communities according to users’ interests.

See website here: 

## **Set up the development environment**
Make sure you have the following tools available.

**Backend**:
1. IntelliJ (with Java 17) using:
      * Spring Web
      * Spring Data JPA
      * PostgreSQL
      * Lombok
2. PostgreSQL (with PgAdmin)
3. Docker

**Frontend:**
1. NPM/Node.js (LTS – Long Term Support version)
2. React CRA (create-react-app)
3. Visual Studio Code Text Editor/ IntelliJ
4. Browser Developer Tools for testing and debugging

## **Requirements for the Lagalt.no-Project**

**Primary Goal**

Understanding social network users’ needs, especially reddit, and find them efficient solutions.

**Complexity Level**

Basic development, creating a **database**, an **API** and a **website** that makes requests on it.

**Roles**

- **Non-login user** can navigate through pages without joining projects’ chats and seeing fewer information about them.
- **Login user** has the same rights as a **non-login user** and much more like making requests to join projects, so they 
can be added to them or even create their own projects. A **login user** can be:
    - **Project member** and they have access to other projects’ information like files repository and chat.
    - **Project owner** and they can add users after a request, remove users, change projects’ information and even delete projects. We decided to add a field called **stage** to project table, which will be initiazed to **"initial"** when a project is created and change to **"completed"** when it ends instead of deleting it.

**Website’s View**

- Home page
- Profile page
- Project page
- Create-project page

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

## **API URLs and requests**
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

## **Archietecture layers to build the database and create API**
We follow the architecture in the below picture

<img src="/pictures/backend_architecture.png">





