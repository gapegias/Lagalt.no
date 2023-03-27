import './TopicsBar.css'
import { Sidebar, Menu, SubMenu } from 'react-pro-sidebar';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';
import TopicsList from './TopicsList';
import { useProjects } from '../../context/ProjectsContext';


const TopicsBar = () => {

  const {projects, setProjects} = useProjects()
  const topics =[...new Set(projects.map(project => project.project_topic))]
  const topicsList = topics.sort().map((topic, index) => {
    let projectByTopic = projects.filter(project => project.project_topic === topic);
    return (
      
        <SubMenu  label={topic } key={index} >
          {<TopicsList  projects={projectByTopic}></TopicsList>}
        </SubMenu>
    )
  })


  return (
    <>
      <div className='Topics-bar'>
        <aside className='Header-box'>
          <h2>Topics</h2>
        </aside>
        <Sidebar>
          <Menu>
            {topicsList}
          </Menu>
        </Sidebar>
      </div>
    </>

  )
}
export default TopicsBar