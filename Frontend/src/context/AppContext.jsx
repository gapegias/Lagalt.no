import EditModeProvider from "./EditMode"
import IsSearchedProvider from "./IsSearchedContext"
import MessagesProvider from "./MessagesContext"
import ProjectProvider from "./ProjectContext"
import ProjectsProvider from "./ProjectsContext"
import ProjectsToShowProvider from "./ProjectsToShowContext"
import RequestsProvider from "./RequestsContext"
import SideBarSelectProvider from "./SideBarSelectContext"
import SkillsProvider from "./SkillsContext"
import UserProvider from "./UserContext"
import UserProfileProvider from "./UserProfileContext"
import UsersProvider from "./UsersContext"

const AppContext = ({ children }) => {
    return (

        <ProjectsProvider>
            <ProjectsToShowProvider>
                <ProjectProvider>
                    <RequestsProvider>
                        <MessagesProvider>
                            <SkillsProvider>
                                <UsersProvider>
                                    <UserProvider>
                                        <UserProfileProvider>
                                            <EditModeProvider>
                                                {children}
                                            </EditModeProvider>
                                        </UserProfileProvider>
                                    </UserProvider>
                                </UsersProvider>
                            </SkillsProvider>
                        </MessagesProvider>
                    </RequestsProvider>
                </ProjectProvider>
            </ProjectsToShowProvider>
        </ProjectsProvider>
    )
}
export default AppContext