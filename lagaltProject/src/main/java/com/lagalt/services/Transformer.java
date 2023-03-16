package com.lagalt.services;

import com.lagalt.models.*;
import com.lagalt.models.DTOs.LagaltUserDTOs.LagaltUserDTO;
import com.lagalt.models.DTOs.LagaltUserDTOs.LagaltUserWithMoreInfoDTO;
import com.lagalt.models.DTOs.ProjectsDTOs.ProjectDTO;
import com.lagalt.models.DTOs.SkillDTOs.SkillDTO;
import com.lagalt.models.DTOs.TopicDTOs.TopicDTO;
import com.lagalt.models.DTOs.MessageDTOs.MessageDTO;
import com.lagalt.models.DTOs.RequestsDTOs.RequestDTO;
import java.util.Set;
import java.util.stream.Collectors;

public class Transformer {

    public static Set<LagaltUserWithMoreInfoDTO> lagaltUserSetToLagaltUserWithMoreInfoDTOSet(Set<LagaltUser> users){
        return users.stream().map(user -> lagaltUserToLagaltUserWithMoreInfoDTO(user)).collect(Collectors.toSet());
    }
    public static LagaltUserWithMoreInfoDTO lagaltUserToLagaltUserWithMoreInfoDTO(LagaltUser user){
        if(user == null)
            return null;
        Set<ProjectDTO> projectDTOSet = projectSetToProjectDTOSet(user.getProjects());
        Set<SkillDTO> skillDTOSet = skillSetToSkillDTOSet(user.getSkills());
        return  new LagaltUserWithMoreInfoDTO(user.getUser_id(),user.getUser_name(), skillDTOSet, projectDTOSet);
    }
    public static Set<LagaltUserDTO> lagaltUserSetToLagaltUserDTOSet(Set<LagaltUser> users){
        return users.stream().map(user -> lagaltUserToLagaltUserDTO(user)).collect(Collectors.toSet());
    }
    public static LagaltUserDTO lagaltUserToLagaltUserDTO(LagaltUser user){
        if(user == null)
            return null;
        Set<SkillDTO> skillDTOSet = skillSetToSkillDTOSet(user.getSkills());
        return new LagaltUserDTO(user.getUser_id(),user.getUser_name(),
                                 user.getUser_about_me(), skillDTOSet);
    }
    public static Set<SkillDTO> skillSetToSkillDTOSet(Set<Skill> skills){
        return  skills.stream().map(skill -> skillToSkillDTO(skill)).collect(Collectors.toSet());
    }
    public static SkillDTO skillToSkillDTO(Skill skill){
        if(skill == null)
            return  null;
        return new SkillDTO(skill.getSkill_id(), skill.getSkill_name());
    }
    public static Set<TopicDTO> topicSetToTopicDTOSet(Set<Topic> topics){
        return topics.stream().map(topic -> topicToTopicDTO(topic)).collect(Collectors.toSet());
    }
    public static TopicDTO topicToTopicDTO(Topic topic){
        if(topic == null)
            return null;
        return new TopicDTO(topic.getTopic_id(), topic.getTopic_name());
    }
    public static Set<RequestDTO> requestSetToRequestDTOSet(Set<Request> requests){
        return requests.stream().map(request -> requestToRequestDTO(request)).collect(Collectors.toSet());
    }
    public static RequestDTO requestToRequestDTO(Request request){
        if(request == null)
            return null;
        return new RequestDTO(request.getRequest_id(), request.getRequest_text(),
                request.getRequest_user_id(), request.getRequest_user_name());
    }
    public static Set<MessageDTO> messageSetToMessageDTOSet(Set<Message> messages){
        return messages.stream().map(message -> messageToMessageDTO(message)).collect(Collectors.toSet());
    }
    public static MessageDTO messageToMessageDTO(Message message){
        if(message == null)
            return null;
        return new MessageDTO(message.getMessage_id(), message.getMessage_text(),
                message.getMessage_timestamp(), message.getMessage_user_name());
    }
    public static Set<ProjectDTO> projectSetToProjectDTOSet(Set<Project> projects){
        return projects.stream().map(project -> projectToProjectDTO(project)).collect(Collectors.toSet());
    }
    public static ProjectDTO projectToProjectDTO(Project project){
        if(project == null)
            return null;
        Set<LagaltUserDTO> lagaltUserDTOSet = lagaltUserSetToLagaltUserDTOSet(project.getUsers());
        TopicDTO topicDTO = topicToTopicDTO(project.getTopic());
        Set<SkillDTO> skillDTOSet = skillSetToSkillDTOSet(project.getSkills());
        Set<RequestDTO> requestDTOSet = requestSetToRequestDTOSet(project.getRequests());
        Set<MessageDTO> messageDTOList = messageSetToMessageDTOSet(project.getMessages());
        return new ProjectDTO(project.getProject_id(), project.getProject_title(),
                              project.getProject_purpose(), project.getProject_stage(),
                              project.getProject_repo_url(), project.getProject_owner(),
                              lagaltUserDTOSet, topicDTO, skillDTOSet,requestDTOSet, messageDTOList);
    }
}
