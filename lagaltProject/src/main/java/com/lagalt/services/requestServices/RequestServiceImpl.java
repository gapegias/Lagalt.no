package com.lagalt.services.requestServices;

import com.lagalt.models.LagaltUser;
import com.lagalt.models.Project;
import com.lagalt.models.Request;
import com.lagalt.repositories.ProjectRepository;
import com.lagalt.repositories.RequestRepository;
import com.lagalt.repositories.UserRepository;
import org.springframework.stereotype.Service;
import java.util.Collection;
import java.util.Set;

@Service
public class RequestServiceImpl implements RequestService{
    private final RequestRepository requestRepository;
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;
    public RequestServiceImpl(RequestRepository requestRepository, ProjectRepository projectRepository, UserRepository userRepository) {
        this.requestRepository = requestRepository;
        this.projectRepository = projectRepository;
        this.userRepository = userRepository;
    }
    @Override
    public Request findById(Integer id) {
        return requestRepository.findById(id).orElse(null);
    }
    @Override
    public Collection<Request> findAll() {
        return requestRepository.findAll();
    }
    @Override
    public Request add(Request request) {
        return requestRepository.save(request);
    }
    @Override
    public Request update(Request request) {
        return requestRepository.save(request);
    }
    @Override
    public void deleteById(Integer id) {
        if(this.requestRepository.existsById(id)){
            Request request  = this.requestRepository.findById(id).get();
            // Remove request from projects' set
            for(Project project : this.projectRepository.findAll())
                if(project.getRequests().contains(request)){
                    Set<Request> requestSet = project.getRequests();
                    requestSet.remove(request);
                    project.setRequests(requestSet);
                }
            // Remove request from users' set
            for(LagaltUser user : this.userRepository.findAll())
                if(user.getRequests().contains(request)){
                    Set<Request> requestSet = user.getRequests();
                    requestSet.remove(request);
                    user.setRequests(requestSet);
                }
            this.requestRepository.deleteById(id);
        }
    }
    @Override
    public boolean exists(Integer id) {
        return this.requestRepository.existsById(id);
    }
}
