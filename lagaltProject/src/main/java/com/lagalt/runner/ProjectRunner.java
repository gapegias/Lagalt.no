package com.lagalt.runner;

import com.lagalt.models.Project;
import com.lagalt.services.projectServices.ProjectService;
import jakarta.transaction.Transactional;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import java.util.ArrayList;
import java.util.List;

@Component
public class ProjectRunner implements CommandLineRunner {
    private final ProjectService projectService;
    public ProjectRunner(ProjectService projectService) {
        this.projectService = projectService;
    }

    @Override
    @Transactional
    public void run(String... args) throws Exception {

        // Get a project by id
        System.out.println(this.projectService.findById(1).toString()); // exists
        System.out.println(this.projectService.findById(5));            // not exists

        // Get all projects
        List<String> projects = new ArrayList<>(this.projectService.findAll().stream().map(project -> project.toString()).toList());
        projects.forEach(project -> System.out.println(project));

        // Add a project (with project_title = "Dummy" and others empty collections or null)
        // ! Attention: If new topic, add it first to topic table
        System.out.println(this.projectService.add(new Project()).toString());

        // Update a project (with project_id = 5 by changing project_title from "Dummy" to "Dummy-Dummy")
        Project modifiedProject = this.projectService.findById(5);
        modifiedProject.setProject_title("Dummy-Dummy");
        System.out.println(this.projectService.update(modifiedProject).toString());

        // Delete a project (with id = 2)
        this.projectService.deleteById(2);
        projects = new ArrayList<>(this.projectService.findAll().stream().map(project -> project.toString()).toList());
        projects.forEach(project -> System.out.println(project));
        // this.userService.deleteById(2);
        // users = new ArrayList<>(this.userService.findAll().stream().map(user -> user.toString()).toList());
        // users.forEach(user -> System.out.println(user));

        // Check if a project by id exists (with id = 1, id = 6)
        System.out.println(this.projectService.exists(1)); // exists
        System.out.println(this.projectService.exists(6)); // not exists
    }
}
