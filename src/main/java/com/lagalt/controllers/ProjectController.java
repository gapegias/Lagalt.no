package com.lagalt.controllers;

import com.lagalt.models.Project;
import com.lagalt.services.projectServices.ProjectService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.net.URI;
import java.net.URISyntaxException;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "http://localhost:8080/projects")
@RestController
@RequestMapping("/projects")
public class ProjectController {

    // Variables
    private final ProjectService projectService;

    // Constructor
    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    // Project's requests
    @GetMapping
    public ResponseEntity findAllProjects(){
        return ResponseEntity.ok(this.projectService.findAllProjects());
    }
    @GetMapping({"{project_id}"})
    public ResponseEntity findProjectByID(@PathVariable int project_id){
        return ResponseEntity.ok(this.projectService.findProjectById(project_id));
    }
    @PostMapping
    public ResponseEntity addProject(@RequestBody Project project) throws URISyntaxException {
        this.projectService.add(project); //Add Project
        URI uri = new URI("projects/"+ project.getProject_id());
        return ResponseEntity.created(uri).build();
    }
    @PutMapping("{project_id}")
    public ResponseEntity updateProjectPut(@RequestBody Project project){
        this.projectService.add(project);
        return ResponseEntity.noContent().build();
    }
    @PatchMapping("{project_id}")
    public ResponseEntity updateProjectPatch(@RequestBody Project project){
        this.projectService.update(project);
        return ResponseEntity.noContent().build();
    }
    @DeleteMapping(value="/{project_id}")
    public void deleteProject(@PathVariable("project_id") int project_id){
        this.projectService.deleteById(project_id);
    }

    // Project's skills requests
    @GetMapping({"{project_id}/skills"})
    public ResponseEntity findSkillsOfProject(@PathVariable int project_id){
        return ResponseEntity.ok(this.projectService.findSkillsOfProject(project_id));
    }
    @GetMapping({"{project_id}/skills/{skill_id}"})
    public ResponseEntity findSkillByIdOfProject(@PathVariable int project_id, @PathVariable int skill_id){
        return ResponseEntity.ok(this.projectService.findSkillByIdOfProject(project_id, skill_id));
    }

    // Project's users requests
    @GetMapping({"{project_id}/users"})
    public ResponseEntity findUsersOfProject(@PathVariable int project_id){
        return ResponseEntity.ok(this.projectService.findUsersOfProject(project_id));
    }
    @GetMapping({"{project_id}/users/{user_id}"})
    public ResponseEntity findUserByIdOfProject(@PathVariable int project_id, @PathVariable int user_id){
        return ResponseEntity.ok(this.projectService.findUserByIdOfProject(project_id, user_id));
    }

    // Project's messages requests
    @GetMapping({"{project_id}/messages"})
    public ResponseEntity findUMessagesOfProject(@PathVariable int project_id){
        return ResponseEntity.ok(this.projectService.findUMessagesOfProject(project_id));
    }
    @GetMapping({"{project_id}/messages/{message_id}"})
    public ResponseEntity findMessageByIdOfProject(@PathVariable int project_id, @PathVariable int message_id){
        return ResponseEntity.ok(this.projectService.findMessageByIdOfProject(project_id, message_id));
    }

    // Project's requests requests
    @GetMapping({"{project_id}/requests"})
    public ResponseEntity findURequestsOfProject(@PathVariable int project_id){
        return ResponseEntity.ok(this.projectService.findURequestsOfProject(project_id));
    }
    @GetMapping({"{project_id}/requests/{request_id}"})
    public ResponseEntity findRequestByIdOfProject(@PathVariable int project_id, @PathVariable int request_id){
        return ResponseEntity.ok(this.projectService.findRequestByIdOfProject(project_id, request_id));
    }
}
