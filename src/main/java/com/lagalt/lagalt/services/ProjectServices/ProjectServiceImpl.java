package com.lagalt.lagalt.services.ProjectServices;

import com.lagalt.lagalt.models.Project;
import com.lagalt.lagalt.repositories.ProjectRepository;

import java.util.Collection;

public class ProjectServiceImpl implements ProjectService{
    
    private final ProjectRepository projectRepository;

    public ProjectServiceImpl(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    @Override
    public Project findById(Integer integer) {
        return projectRepository.findById(integer).get();
    }

    @Override
    public Collection<Project> findAll() {
        return projectRepository.findAll();
    }

    @Override
    public Project add(Project entity) {
        return projectRepository.save(entity);
    }

    @Override
    public Project update(Project entity) {
        return projectRepository.save(entity);
    }

    @Override
    public void deleteByID(Integer integer) {

    }

    @Override
    public void delete(Project entity) {

    }
}
