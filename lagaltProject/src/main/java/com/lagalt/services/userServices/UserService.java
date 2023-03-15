package com.lagalt.services.userServices;

import com.lagalt.models.DTOs.ProjectsDTOs.ProjectDTO;
import com.lagalt.models.DTOs.SkillDTOs.SkillDTO;
import com.lagalt.models.LagaltUser;
import com.lagalt.models.Project;
import com.lagalt.models.Skill;
import com.lagalt.services.CRUDService;
import java.util.Collection;

public interface UserService extends CRUDService<LagaltUser, Integer> {
    SkillDTO findSkillByIdOfUser(Integer userId, Integer skillId);
    Collection<SkillDTO> findSkillsOfUser(Integer userId);
    Skill addSkillOnUser(Integer userId, Skill skill);
    void deleteSkillByIdFromUser(Integer userId, Integer skillId);
    ////
    ProjectDTO findProjectByIdOfUser(Integer userId, Integer projectId);
    Collection<ProjectDTO> findProjectsOfUser(Integer userId);
    Skill addUserOnProject(Integer userId, Project project);
    void deleteUserFromProjectById(Integer userId, Integer projectId);
}
