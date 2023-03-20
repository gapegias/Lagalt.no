package com.lagalt.models.DTOs.LagaltUserDTOs;

import lombok.Getter;
import lombok.Setter;
import com.lagalt.models.DTOs.ProjectsDTOs.ProjectDTO;
import com.lagalt.models.DTOs.SkillDTOs.SkillDTO;
import java.util.Set;

@Getter
@Setter
public class LagaltUserWithMoreInfoDTO {
    // Constructor
    public LagaltUserWithMoreInfoDTO(int user_id, String user_name, String user_about_me, Set<SkillDTO> skills, Set<ProjectDTO> projects){
        this.user_id = user_id;
        this.user_name = user_name;
        this.user_about_me = user_about_me;
        this.skills = skills;
        this.projects = projects;
    }
    private int user_id;
    private String user_name;
    private String user_about_me;
    private Set<SkillDTO> skills;
    private Set<ProjectDTO> projects;
}
