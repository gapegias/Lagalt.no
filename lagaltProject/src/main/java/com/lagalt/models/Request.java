package com.lagalt.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.util.Set;
import java.util.stream.Collectors;

@Entity
@Getter
@Setter
@Table(name = "request")
public class Request {

    // Table's columns
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "request_id")
    private int request_id;
    @Column(name = "request_text")
    private String request_text;
    @Column(name = "request_user_id")
    private int request_user_id;
    @Column(name = "request_user_name", length = 50)
    private String request_user_name;

    //Table's relationships
    @ManyToMany(mappedBy = "requests") // owned
    private Set<Project> projects;

    // Table's method for record info
    public String toString(){
        String projectStr = projects.stream()
                                    .map(project -> project.getProject_title())
                                    .collect(Collectors.toSet())
                                    .toString();
        return "{ \nid: " + request_id + ", \ntext: " + request_text + ", \nuser_id: " + request_user_id +
               ", \nuser_name: " + request_user_name + ", \nprojects: " + projectStr + "  \n}";
    }
}
