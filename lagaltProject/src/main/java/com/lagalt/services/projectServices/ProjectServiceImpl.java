package com.lagalt.services.projectServices;

import com.lagalt.models.*;
import com.lagalt.models.DTOs.LagaltUserDTOs.LagaltUserDTO;
import com.lagalt.models.DTOs.MessageDTOs.MessageDTO;
import com.lagalt.models.DTOs.ProjectsDTOs.ProjectDTO;
import com.lagalt.models.DTOs.RequestsDTOs.RequestDTO;
import com.lagalt.models.DTOs.SkillDTOs.SkillDTO;
import com.lagalt.repositories.*;
import com.lagalt.services.Transformer;
import org.springframework.stereotype.Service;
import java.util.Collection;
import java.util.stream.Collectors;

@Service
public class ProjectServiceImpl implements ProjectService{

    // Variables
    private final ProjectRepository projectRepository;
    private final RequestRepository requestRepository;
    private final UserRepository userRepository;
    private final SkillRepository skillRepository;

    // Constructor
    public ProjectServiceImpl(ProjectRepository projectRepository, RequestRepository requestRepository,
                              UserRepository userRepository, SkillRepository skillRepository) {
        this.projectRepository = projectRepository;
        this.requestRepository = requestRepository;
        this.userRepository = userRepository;
        this.skillRepository = skillRepository;
    }

    // Project's crud methods
    // Do not use this (instead use DTO)
    @Override
    public Project findById(Integer project_id) {
        return this.projectRepository.findById(project_id).get();
    }
    public ProjectDTO findProjectById(Integer project_id){
        return Transformer.projectToProjectDTO(findById(project_id));
    }
    // Do not use this (instead use DTO)
    @Override
    public Collection<Project> findAll() {
        return this.projectRepository.findAll();
    }
    public Collection<ProjectDTO> findAllProjects(){
        return Transformer.projectSetToProjectDTOSet(findAll().stream().collect(Collectors.toSet()));
    }
    @Override
    public Project add(Project project) {
        Project existed_project = this.projectRepository.findById(project.getProject_id()).orElse(null);
        if(existed_project == null){
            project.setProject_stage("initial");
            return this.projectRepository.save(project);
        }
        if(project.getProject_topic() == null)
            project.setProject_topic(existed_project.getProject_topic());
        if(project.getProject_stage() == null)
            project.setProject_stage(existed_project.getProject_stage());
        return this.projectRepository.save(project);
    }
    @Override
    public Project update(Project project) {
        // Not id given, use findById() method to throw an error
        Project existed_project = this.projectRepository.findById(project.getProject_id()).orElse(null);
        if(existed_project == null)
            return findById(project.getProject_id());
        // If title is given, change it
        if(project.getProject_title() != null)
            existed_project.setProject_title(project.getProject_title());
        // If purpose is given, change it
        if(project.getProject_purpose() != null)
            existed_project.setProject_purpose(project.getProject_purpose());
        // If stage is given, change it
        if(project.getProject_stage() != null)
            existed_project.setProject_stage(project.getProject_stage());
        // If repo_url is given, change it
        if(project.getProject_repo_url() != null)
            existed_project.setProject_repo_url(project.getProject_repo_url());
        // If owner is given, change it
        if(project.getProject_owner() != null)
            existed_project.setProject_owner(project.getProject_owner());
        // If skills are given, change it
        if(project.getSkills() != null)
            existed_project.setSkills(project.getSkills());
        // If users are given, change it
        if(project.getUsers() != null)
            existed_project.setUsers(project.getUsers());
        // If topic is given, change it
        if(project.getProject_topic() != null)
            existed_project.setProject_topic(project.getProject_topic());
        // If requests are given, change it
        if(project.getRequests() != null)
            existed_project.setRequests(project.getRequests());
        // If messages are given, change it
        if(project.getMessages() != null)
            existed_project.setMessages(project.getMessages());
        return this.projectRepository.save(existed_project);
    }
    @Override
    public void deleteById(Integer project_id) {
        if(this.projectRepository.existsById(project_id)){
            Project project = findById(project_id);
            // Break user link to project that we want to delete
            project.setUsers(null);
            // Break skill link to project that we want to delete
            project.setSkills(null);
            // Break message link to project that we want to delete
            project.setMessages(null);
            // Break request link to project that we want to delete
            project.setRequests(null);
            this.projectRepository.delete(project);
        }
    }
    @Override
    public boolean exists(Integer project_id) {
        return this.projectRepository.existsById(project_id);
    }

    // Project's skills methods
    public SkillDTO findSkillByIdOfProject(Integer project_id, Integer skill_id){
        for(SkillDTO skill : findProjectById(project_id).getSkills())
            if(skill.getSkill_id() == skill_id)
                return skill;
        return null;
    }
    public Collection<SkillDTO> findSkillsOfProject(Integer project_id){
        return findProjectById(project_id).getSkills();
    }

    // Project's users methods
    public LagaltUserDTO findUserByIdOfProject(Integer project_id, Integer user_id){
        for(LagaltUserDTO user : findProjectById(project_id).getUsers())
            if(user.getUser_id() == user_id)
                return user;
        return null;
    }
    public Collection<LagaltUserDTO> findUsersOfProject(Integer project_id){
        return findProjectById(project_id).getUsers();
    }

    // Project's messages methods
    public MessageDTO findMessageByIdOfProject(Integer project_id, Integer message_id){
        for(MessageDTO message : findProjectById(project_id).getMessages())
            if(message.getMessage_id() == message_id)
                return message;
        return null;
    }
    public Collection<MessageDTO> findUMessagesOfProject(Integer project_id){
        return findProjectById(project_id).getMessages();
    }

    // Project's requests methods
    public RequestDTO findRequestByIdOfProject(Integer project_id, Integer request_id){
        for(RequestDTO request : findProjectById(project_id).getRequests())
            if(request.getRequest_id() == request_id)
                return request;
        return null;
    }
    public Collection<RequestDTO> findURequestsOfProject(Integer project_id){
        return findProjectById(project_id).getRequests();
    }
}
