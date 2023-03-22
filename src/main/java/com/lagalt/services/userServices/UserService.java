package com.lagalt.services.userServices;

import com.lagalt.models.DTOs.LagaltUserDTOs.LagaltUserWithMoreInfoDTO;
import com.lagalt.models.DTOs.ProjectsDTOs.ProjectDTO;
import com.lagalt.models.DTOs.SkillDTOs.SkillDTO;
import com.lagalt.models.LagaltUser;
import com.lagalt.services.CRUDService;
import java.util.Collection;

public interface UserService extends CRUDService<LagaltUser, Integer> {

    // User's extra methods
    LagaltUserWithMoreInfoDTO findUserByName(String user_name);
    LagaltUserWithMoreInfoDTO findUserById(Integer user_id);
    Collection<LagaltUserWithMoreInfoDTO> findAllUsers();

    // User's skills methods
    SkillDTO findSkillByIdOfUser(Integer user_id, Integer skill_id);
    Collection<SkillDTO> findSkillsOfUser(Integer user_id);

    // User's projects methods
    ProjectDTO findProjectByIdOfUser(Integer user_id, Integer project_id);
    Collection<ProjectDTO> findProjectsOfUser(Integer user_id);
}
