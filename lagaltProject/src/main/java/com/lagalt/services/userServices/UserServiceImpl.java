package com.lagalt.services.userServices;

import com.lagalt.models.DTOs.LagaltUserDTOs.LagaltUserDTO;
import com.lagalt.models.DTOs.ProjectsDTOs.ProjectDTO;
import com.lagalt.models.DTOs.SkillDTOs.SkillDTO;
import com.lagalt.models.DTOs.TopicDTOs.TopicDTO;
import com.lagalt.models.LagaltUser;
import com.lagalt.models.Project;
import com.lagalt.models.Skill;
import com.lagalt.repositories.*;
import org.springframework.stereotype.Service;
import java.util.Collection;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final ProjectRepository projectRepository;
    private final SkillRepository skillRepository;
    private final RequestRepository requestRepository;
    private final MessageRepository messageRepository;
    public UserServiceImpl(UserRepository userRepository, ProjectRepository projectRepository, SkillRepository skillRepository,
                           RequestRepository requestRepository, MessageRepository messageRepository) {
        this.userRepository = userRepository;
        this.projectRepository = projectRepository;
        this.messageRepository = messageRepository;
        this.skillRepository = skillRepository;
        this.requestRepository = requestRepository;
    }
    @Override
    public LagaltUser findById(Integer id) {
        return this.userRepository.findById(id).orElse(null);
    }
    @Override
    public Collection<LagaltUser> findAll() {
        return this.userRepository.findAll();
    }
    @Override
    public LagaltUser add(LagaltUser user) {
        return this.userRepository.save(user);
    }
    @Override
    public LagaltUser update(LagaltUser user) {
        return this.userRepository.save(user);
    }
    @Override
    public void deleteById(Integer id) {
        if(this.userRepository.existsById(id)){
            LagaltUser user = this.userRepository.findById(id).get();
            // Break skill link to user that we want to delete
            this.userRepository.findById(id).get().setSkills(null);
            // Set users' project the ones without user that we want to delete
            for(Project project : this.projectRepository.findAll())
                if(project.getUsers().contains((user))){
                   Set<LagaltUser> users = project.getUsers();
                   users.remove(user);
                   project.setUsers(users);
                }
            // Delete user's requests that we want to delete
            this.requestRepository.findAll().stream()
                                            .filter(request -> request.getUser() == user)
                                            .forEach(request -> this.requestRepository.delete(request));
            // Delete user's messages that we want to delete
            this.messageRepository.findAll().stream()
                                            .filter(message -> message.getUser() == user)
                                            .forEach(message -> this.messageRepository.delete(message));
            this.userRepository.delete(user);
        }
    }
    @Override
    public boolean exists(Integer id) {
        return this.userRepository.existsById(id);
    }

    /////////////////
    @Override
    public SkillDTO findSkillByIdOfUser(Integer userId, Integer skillId) {
        SkillDTO skillDTO = null;
        for(Skill s : this.userRepository.findById(userId).get().getSkills())
            if(s.getSkill_id() == skillId)
                skillDTO = new SkillDTO(s.getSkill_id(), s.getSkill_name());
        return skillDTO;
    }
    @Override
    public Collection<SkillDTO> findSkillsOfUser(Integer userId) {
        Set<SkillDTO> skillDTOSet = new HashSet<>();
        for(Skill s : this.userRepository.findById(userId).get().getSkills())
            skillDTOSet.add(new SkillDTO(s.getSkill_id(), s.getSkill_name()));
        return skillDTOSet;
    }

    @Override
    public Skill addSkillOnUser(Integer userId, Skill skill) {
        return null;
    }
    @Override
    public void deleteSkillByIdFromUser(Integer userId, Integer skillId) {

    }

    /////////////////////////

    @Override
    public ProjectDTO findProjectByIdOfUser(Integer userId, Integer projectId) {
        ProjectDTO projectDTO = null;
        for(Project p : this.userRepository.findById(userId).get().getProjects())
            if(p.getProject_id() == projectId){
                Set<LagaltUserDTO> lagaltUserDTOSet = p.getUsers().stream()
                                                                  .map(user -> new LagaltUserDTO(user.getUser_id(),user.getUser_name()))
                                                                  .collect(Collectors.toSet());
                TopicDTO topicDTO = new TopicDTO(p.getTopic().getTopic_id(), p.getTopic().getTopic_name());
                Set<SkillDTO> skillDTOSet = p.getSkills().stream()
                                                         .map(skill -> new SkillDTO(skill.getSkill_id(), skill.getSkill_name()))
                                                         .collect(Collectors.toSet());
                projectDTO = new ProjectDTO(p.getProject_id(), p.getProject_title(), p.getProject_purpose(),
                                            p.getProject_stage(), p.getProject_repo_url(), p.getProject_owner(),
                                            lagaltUserDTOSet, topicDTO, skillDTOSet);
            }
        return projectDTO;
    }
    @Override
    public Collection<ProjectDTO> findProjectsOfUser(Integer userId) {
        Set<ProjectDTO> projectDTOSet = new HashSet<>();
        for(Project p : this.userRepository.findById(userId).get().getProjects()){
            Set<LagaltUserDTO> lagaltUserDTOSet = p.getUsers().stream()
                    .map(user -> new LagaltUserDTO(user.getUser_id(),user.getUser_name()))
                    .collect(Collectors.toSet());
            TopicDTO topicDTO = new TopicDTO(p.getTopic().getTopic_id(), p.getTopic().getTopic_name());
            Set<SkillDTO> skillDTOSet = p.getSkills().stream()
                    .map(skill -> new SkillDTO(skill.getSkill_id(), skill.getSkill_name()))
                    .collect(Collectors.toSet());
            projectDTOSet.add(new ProjectDTO(p.getProject_id(), p.getProject_title(), p.getProject_purpose(),
                                             p.getProject_stage(), p.getProject_repo_url(), p.getProject_owner(),
                                             lagaltUserDTOSet, topicDTO, skillDTOSet));
        }
        return projectDTOSet;
    }

    @Override
    public Skill addUserOnProject(Integer userId, Project project) {
        return null;
    }

    @Override
    public void deleteUserFromProjectById(Integer userId, Integer projectId) {

    }
}