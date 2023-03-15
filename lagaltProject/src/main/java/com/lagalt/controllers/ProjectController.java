package com.lagalt.controllers;

import com.lagalt.models.LagaltUser;
import com.lagalt.models.Project;
import com.lagalt.services.projectServices.ProjectService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

@RestController
@RequestMapping("/projects")
public class ProjectController {

    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {

        this.projectService = projectService;
    }

    @GetMapping
    public ResponseEntity findAll(){

        return ResponseEntity.ok(projectService.findAll());
    }

    @GetMapping({"{id}"})
    public ResponseEntity findByID(@PathVariable int id){

        return ResponseEntity.ok(projectService.findById(id));
    }

    @PostMapping
    public ResponseEntity add(@RequestBody Project project) throws URISyntaxException {
        //Add User
        projectService.add(project);
        URI uri = new URI("projects/"+ project.getProject_id());


        return ResponseEntity.created(uri).build();
    }

    @DeleteMapping(value="/{project_id}")
    public void deleteProject(@PathVariable("project_id") int project_id){
        projectService.deleteById(project_id);
    }
}
