package com.lagalt.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.util.Set;
import java.util.stream.Collectors;

@Entity
@Getter
@Setter
@Table(name = "lagalt_user")
public class LagaltUser {

    // Table's columns
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private int user_id;
    @Column(name = "user_name", length = 50, unique = true)
    private String user_name;
    @Column(name = "user_about_me")
    private String user_about_me;

    //Table's relationships
    @ManyToMany(mappedBy = "users") // owned
    private Set<Project> projects;
    @ManyToMany  // owner
    @JoinTable(
            name ="lagalt_user_skills",
            joinColumns = {@JoinColumn(name = "user_id")},
            inverseJoinColumns = {@JoinColumn(name = "skill_id")}
    )
    private Set<Skill> skills;

    // Table's method for record info
    public String toString(){
        String projectsStr = projects.stream().map(project -> project.getProject_title())
                                              .collect(Collectors.toSet())
                                              .toString();
        String skillsStr = skills.stream().map(skill -> skill.getSkill_name())
                                          .collect(Collectors.toSet())
                                          .toString();
        return "{ \nid: " + user_id + ", \nname: " + user_name + ", \nabout_me: " + user_about_me +
                ", \nskills: " + skillsStr + ", \nprojects: " + projectsStr + " \n}";
    }
}