package com.lagalt.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Entity
@Getter
@Setter
@Table(name = "lagalt_user")
public class LagaltUser {
    // Constructor
    public LagaltUser(){
        user_name = "Dummy";
        projects = new HashSet<>();
        skills = new HashSet<>();
        requests = new HashSet<>();
        messages = new ArrayList<>();
    }
    // Table's columns
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private int user_id;
    @Column(name = "user_name", length = 50, nullable = false, unique = true)
    private String user_name;
    //Table's relationships
    @ManyToMany //owner
    @JoinTable(
            name = "lagalt_user_projects",
            joinColumns = {@JoinColumn(name = "user_id")},
            inverseJoinColumns = {@JoinColumn(name = "project_id")}
    )
    private Set<Project> projects;
    @ManyToMany  //owner
    @JoinTable(
            name ="lagalt_user_skills",
            joinColumns = {@JoinColumn(name = "user_id")},
            inverseJoinColumns = {@JoinColumn(name = "skill_id")}
    )
    private Set<Skill> skills;
    @OneToMany(mappedBy="user", fetch = FetchType.EAGER)
    private Set<Request> requests;
    @OneToMany(mappedBy="user", fetch = FetchType.EAGER)
    private List<Message> messages;
    // Table's method for record info
    public String toString(){
        // String projectsStr = projects.stream().map(project -> project.getProject_title())
        //                                       .collect(Collectors.joining(", "));
        String projectsStr = projects.stream()
                .map(project -> project.getUsers().stream()
                        .map(user -> user.getUser_id()).collect(Collectors.toSet()).toString())
                                              .collect(Collectors.joining(", "));
        String skillsStr = skills.stream().map(skill -> skill.getSkill_name())
                                          .collect(Collectors.joining(", "));
        String requestsStr = requests.stream().map(request -> request.getRequest_text())
                                              .collect(Collectors.joining(", "));
        String messagesStr = messages.stream().map(message -> message.getMessage_text())
                                              .collect(Collectors.joining(", "));
        return "{ \nid: " + user_id + ", \nname: " + user_name + ", \nprojects: { " + projectsStr +
               " }, \nskills: { " + skillsStr + " }, \nrequests: { " + requestsStr +
               " }, \nmessages: { " + messagesStr + " } \n}";
    }
}
