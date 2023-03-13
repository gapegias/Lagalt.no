package com.lagalt.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Entity
@Getter
@Setter
@Table(name = "skill")
public class Skill {
    // Constructor
    public Skill(){
        skill_name = "Dummy";
        users = new HashSet<>();
        projects = new HashSet<>();
    }
    // Table's columns
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "skill_id")
    private int skill_id;
    @Column(name = "skill_name", length = 50, nullable = false, unique = true)
    private String skill_name;
    //Table's relationships
    @ManyToMany(mappedBy = "skills")  //direction
    private Set<LagaltUser> users;
    @ManyToMany(mappedBy = "skills")  //direction
    private Set<Project> projects;
    // Table's method for record info
    public String toString(){
        String usersStr = users.stream().map(user -> user.getUser_name())
                                        .collect(Collectors.toSet())
                                        .toString();
        String projectsStr = projects.stream().map(project -> project.getProject_title())
                                              .collect(Collectors.toSet())
                                              .toString();
        return "{ \nid: " + skill_id + ", \nname: " + skill_name + ", \nusers: " + usersStr +
               ", \nprojects: " + projectsStr + "  \n}";
    }
}
