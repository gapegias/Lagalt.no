package com.lagalt.services.userServices;

import com.lagalt.models.LagaltUser;
import com.lagalt.models.Project;
import com.lagalt.repositories.*;
import org.springframework.stereotype.Service;
import java.util.Collection;
import java.util.Set;

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
        return userRepository.findById(id).orElse(null);
    }
    @Override
    public Collection<LagaltUser> findAll() {
        return userRepository.findAll();
    }
    @Override
    public LagaltUser add(LagaltUser user) {
        return userRepository.save(user);
    }
    @Override
    public LagaltUser update(LagaltUser user) {
        return userRepository.save(user);
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
}