import EditModeProvider from "./EditMode"
import MessagesProvider from "./MessagesContext"
import ProjectProvider from "./ProjectContext"
import ProjectsProvider from "./ProjectsContext"
import ProjectsToShowProvider from "./ProjectsToShowContext"
import RequestsProvider from "./RequestsContext"
import SkillsProvider from "./SkillsContext"
import UserProvider from "./UserContext"
import UserProfileProvider from "./UserProfileContext"


const AppContext = ({ children }) => {
    return (

        <ProjectsProvider>
            <ProjectsToShowProvider>
                <ProjectProvider>
                    <RequestsProvider>
                        <MessagesProvider>
                            <SkillsProvider>
                                    <UserProvider>
                                        <UserProfileProvider>
                                            <EditModeProvider>
                                                {children}
                                            </EditModeProvider>
                                        </UserProfileProvider>
                                    </UserProvider>
                            </SkillsProvider>
                        </MessagesProvider>
                    </RequestsProvider>
                </ProjectProvider>
            </ProjectsToShowProvider>
        </ProjectsProvider>
    )
}
export default AppContext