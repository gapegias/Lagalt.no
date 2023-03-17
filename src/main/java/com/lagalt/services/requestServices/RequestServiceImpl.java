package com.lagalt.services.requestServices;

import com.lagalt.models.DTOs.RequestsDTOs.RequestDTO;
import com.lagalt.models.LagaltUser;
import com.lagalt.models.Project;
import com.lagalt.models.Request;
import com.lagalt.repositories.ProjectRepository;
import com.lagalt.repositories.RequestRepository;
import com.lagalt.repositories.UserRepository;
import com.lagalt.services.Transformer;
import org.springframework.stereotype.Service;
import java.util.Collection;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class RequestServiceImpl implements RequestService{

    // Variables
    private final RequestRepository requestRepository;
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

    // Constructor
    public RequestServiceImpl(RequestRepository requestRepository, ProjectRepository projectRepository, UserRepository userRepository) {
        this.requestRepository = requestRepository;
        this.projectRepository = projectRepository;
        this.userRepository = userRepository;
    }

    // Request's crud methods
    // Do not use this (instead use DTO)
    @Override
    public Request findById(Integer request_id) {
        return requestRepository.findById(request_id).get();
    }
    public RequestDTO findRequestById(Integer request_id){
        return Transformer.requestToRequestDTO(findById(request_id));
    }
    // Do not use this (instead use DTO)
    @Override
    public Collection<Request> findAll() {
        return requestRepository.findAll();
    }
    public Collection<RequestDTO> findAllRequests(){
        return Transformer.requestSetToRequestDTOSet(findAll().stream().collect(Collectors.toSet()));
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
            this.requestRepository.deleteById(id);
        }
    }
    @Override
    public boolean exists(Integer id) {
        return this.requestRepository.existsById(id);
    }
}
