package com.lagalt.services.projectServices;

import com.lagalt.models.LagaltUser;
import com.lagalt.models.Project;
import com.lagalt.repositories.ProjectRepository;
import com.lagalt.repositories.RequestRepository;
import com.lagalt.repositories.TopicRepository;
import com.lagalt.repositories.UserRepository;
import org.springframework.stereotype.Service;
import java.util.Collection;
import java.util.Set;

@Service
public class ProjectServiceImpl implements ProjectService{
    private final ProjectRepository projectRepository;
    private final RequestRepository requestRepository;
    private final TopicRepository topicRepository;
    private final UserRepository userRepository;
    public ProjectServiceImpl(ProjectRepository projectRepository, RequestRepository requestRepository,
                              TopicRepository topicRepository, UserRepository userRepository) {
        this.projectRepository = projectRepository;
        this.requestRepository = requestRepository;
        this.topicRepository = topicRepository;
        this.userRepository = userRepository;
    }
    @Override
    public Project findById(Integer id) {
        return this.projectRepository.findById(id).orElse(null);
    }
    @Override
    public Collection<Project> findAll() {
        return this.projectRepository.findAll();
    }
    @Override
    public Project add(Project project) {
        if(!this.topicRepository.findAll().contains(project.getTopic()))
            this.topicRepository.save(project.getTopic());
        return this.projectRepository.save(project);
    }
    @Override
    public Project update(Project project) {
        if(!this.topicRepository.findAll().contains(project.getTopic()))
            this.topicRepository.save(project.getTopic());
        return this.projectRepository.save(project);
    }
    @Override
    public void deleteById(Integer id) {
        if(this.projectRepository.existsById(id)){
            Project project = this.projectRepository.findById(id).get();
            // Remove project from users' set
            for(LagaltUser user : this.userRepository.findAll())
                if(user.getProjects().contains(project)){
                    Set<Project> projectSet = user.getProjects();
                    projectSet.remove(project);
                    user.setProjects(projectSet);
                }
            // Break skill link to project that we want to delete
            this.projectRepository.findById(id).get().setSkills(null);
            // Break topic link to project that we want to delete
            this.projectRepository.findById(id).get().setTopic(null);
            // Delete project's requests that we want to delete
            this.requestRepository.findAll().stream()
                    .filter(request -> request.getProject() == project)
                    .forEach(request -> this.requestRepository.delete(request));
            this.projectRepository.delete(project);
        }
    }
    @Override
    public boolean exists(Integer id) {
        return this.projectRepository.existsById(id);
    }
}
