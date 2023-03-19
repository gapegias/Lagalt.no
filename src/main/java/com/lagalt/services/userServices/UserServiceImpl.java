package com.lagalt.services.userServices;

import com.lagalt.models.*;
import com.lagalt.models.DTOs.LagaltUserDTOs.LagaltUserWithMoreInfoDTO;
import com.lagalt.models.DTOs.ProjectsDTOs.ProjectDTO;
import com.lagalt.models.DTOs.SkillDTOs.SkillDTO;
import com.lagalt.repositories.*;
import com.lagalt.services.Transformer;
import org.springframework.stereotype.Service;
import java.util.Collection;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    // Variables
    private final UserRepository userRepository;
    private final ProjectRepository projectRepository;
    private final SkillRepository skillRepository;
    private final RequestRepository requestRepository;
    private final MessageRepository messageRepository;

    // Constructor
    public UserServiceImpl(UserRepository userRepository, ProjectRepository projectRepository, SkillRepository skillRepository,
                           RequestRepository requestRepository, MessageRepository messageRepository) {
        this.userRepository = userRepository;
        this.projectRepository = projectRepository;
        this.messageRepository = messageRepository;
        this.skillRepository = skillRepository;
        this.requestRepository = requestRepository;
    }

    // User's crud methods
    public LagaltUserWithMoreInfoDTO findUserByName(String user_name){
        for(LagaltUserWithMoreInfoDTO user : findAllUsers())
            if(user.getUser_name().equals(user_name))
                return user;
        return null;
    }
    // Do not use this (instead use DTO)
    @Override
    public LagaltUser findById(Integer user_id) {
        return this.userRepository.findById(user_id).get();
    }
    public LagaltUserWithMoreInfoDTO findUserById(Integer user_id){
        return Transformer.lagaltUserToLagaltUserWithMoreInfoDTO(findById(user_id));
    }
    // Do not use this (instead use DTO)
    @Override
    public Collection<LagaltUser> findAll() {
        return this.userRepository.findAll();
    }
    public Collection<LagaltUserWithMoreInfoDTO> findAllUsers(){
        return Transformer.lagaltUserSetToLagaltUserWithMoreInfoDTOSet(findAll().stream().collect(Collectors.toSet()));
    }
    @Override
    public LagaltUser add(LagaltUser user) {
        return this.userRepository.save(user);
    }
    @Override
    public LagaltUser update(LagaltUser user) {
        // Not id given, use findById() method to throw an error
        LagaltUser existed_user = this.userRepository.findById(user.getUser_id()).orElse(null);
        if(user == null)
            return findById(user.getUser_id());
        // If name is given, change it
        if(user.getUser_name() != null)
            existed_user.setUser_name(user.getUser_name());
        // If about_me is given, change it
        if(user.getUser_about_me() != null)
            existed_user.setUser_name(user.getUser_about_me());
        // If skills is given, change it
        if(user.getSkills() != null)
            existed_user.setSkills(user.getSkills());
        return this.userRepository.save(existed_user);
    }
    @Override
    public void deleteById(Integer user_id) {
        if(this.userRepository.existsById(user_id)){
            LagaltUser user = this.userRepository.findById(user_id).get();
            // Break skill link to user that we want to delete
            this.userRepository.findById(user_id).get().setSkills(null);
            // Remove user that we want to delete from projects
            for(Project project : this.projectRepository.findAll())
                if(project.getUsers().contains(user)){
                   Set<LagaltUser> users = project.getUsers();
                   users.remove(user);
                   project.setUsers(users);
                }
            this.userRepository.delete(user);
        }
    }
    @Override
    public boolean exists(Integer user_id) {
        return this.userRepository.existsById(user_id);
    }

    // User's skills methods
    @Override
    public SkillDTO findSkillByIdOfUser(Integer user_id, Integer skill_id) {
        for(Skill s : findById(user_id).getSkills())
            if(s.getSkill_id() == skill_id)
                return Transformer.skillToSkillDTO(s);
        return null;
    }
    @Override
    public Collection<SkillDTO> findSkillsOfUser(Integer user_id) {
        return Transformer.skillSetToSkillDTOSet(findById(user_id).getSkills());
    }

    // User's projects methods
    @Override
    public ProjectDTO findProjectByIdOfUser(Integer user_id, Integer project_id) {
        for(Project p : findById(user_id).getProjects())
            if(p.getProject_id() == project_id)
                return Transformer.projectToProjectDTO(p);
        return null;
    }
    @Override
    public Collection<ProjectDTO> findProjectsOfUser(Integer user_id) {
        return Transformer.projectSetToProjectDTOSet(findById(user_id).getProjects());
    }
}
