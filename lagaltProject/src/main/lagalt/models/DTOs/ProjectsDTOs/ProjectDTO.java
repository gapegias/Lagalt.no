package com.lagalt.models.DTOs.ProjectsDTOs;

import com.lagalt.models.DTOs.LagaltUserDTOs.LagaltUserDTO;
import com.lagalt.models.DTOs.SkillDTOs.SkillDTO;
import com.lagalt.models.DTOs.TopicDTOs.TopicDTO;
import com.lagalt.models.DTOs.MessageDTOs.MessageDTO;
import com.lagalt.models.DTOs.RequestsDTOs.RequestDTO;
import lombok.Getter;
import lombok.Setter;
import java.util.Set;

@Getter
@Setter
public class ProjectDTO {
    // Constructor
    public ProjectDTO(int project_id, String project_title, String project_purpose,
                      String project_stage, String project_repo_url, String project_owner,
                      Set<LagaltUserDTO> users, TopicDTO topic, Set<SkillDTO> skills,
                      Set<RequestDTO> requests, Set<MessageDTO> messages){
        this.project_id = project_id;
        this.project_title = project_title;
        this.project_purpose = project_purpose;
        this.project_stage = project_stage;
        this.project_repo_url = project_repo_url;
        this.project_owner = project_owner;
        this.users = users;
        this.topic = topic;
        this.skills = skills;
        this.requests = requests;
        this.messages = messages;
    }
    private int project_id;
    private String project_title;
    private String project_purpose;
    private String project_stage;
    private String project_repo_url;
    private String project_owner;
    private Set<LagaltUserDTO> users;
    private TopicDTO topic;
    private Set<SkillDTO> skills;
    private Set<RequestDTO> requests;
    private Set<MessageDTO> messages;
}