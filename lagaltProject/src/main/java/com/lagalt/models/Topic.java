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
@Table(name = "topic")
public class Topic {
    // Constructor
    public Topic(){
        topic_name = "Dummy";
        projects = new HashSet<>();
    }
    // Table's columns
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "topic_id")
    private int topic_id;
    @Column(name = "topic_name", length = 50, nullable = false)
    private String topic_name;
    // Table's relationships
    @OneToMany(mappedBy="topic", fetch = FetchType.EAGER)
    private Set<Project> projects;
    // Table's method for record info
    public String toString(){
        String projectsStr = projects.stream().map(project -> project.getProject_title())
                                              .collect(Collectors.joining(", "));
        return "{ id: " + topic_id + ", name: " + topic_name + ", projects: " + projectsStr + " }";
    }
}
