package com.lagalt.services.projectServices;

import com.lagalt.models.DTOs.LagaltUserDTOs.LagaltUserDTO;
import com.lagalt.models.DTOs.MessageDTOs.MessageDTO;
import com.lagalt.models.DTOs.ProjectsDTOs.ProjectDTO;
import com.lagalt.models.DTOs.RequestsDTOs.RequestDTO;
import com.lagalt.models.DTOs.SkillDTOs.SkillDTO;
import com.lagalt.models.DTOs.TopicDTOs.TopicDTO;
import com.lagalt.models.Project;
import com.lagalt.services.CRUDService;
import java.util.Collection;

public interface ProjectService extends CRUDService<Project, Integer> {

    // Project's extra methods
    ProjectDTO findProjectById(Integer project_id);
    Collection<ProjectDTO> findAllProjects();

    // Project's topic methods
    TopicDTO findTopicOfProject(Integer project_id);

    // Project's skills methods
    SkillDTO findSkillByIdOfProject(Integer project_id, Integer skill_id);
    Collection<SkillDTO> findSkillsOfProject(Integer project_id);

    // Project's users methods
    LagaltUserDTO findUserByIdOfProject(Integer project_id, Integer user_id);
    Collection<LagaltUserDTO> findUsersOfProject(Integer project_id);

    // Project's messages methods
    MessageDTO findMessageByIdOfProject(Integer project_id, Integer message_id);
    Collection<MessageDTO> findUMessagesOfProject(Integer project_id);

    // Project's requests methods
    RequestDTO findRequestByIdOfProject(Integer project_id, Integer request_id);
    Collection<RequestDTO> findURequestsOfProject(Integer project_id);

}
