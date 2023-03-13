package com.lagalt.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "request")
public class Request {
    // Constructor
    public Request(){
        request_text = "Dummy";
        user = null;
        project = null;
    }
    // Table's columns
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "request_id")
    private int request_id;
    @Column(name = "request_text", nullable = false)
    private String request_text;
    //Table's relationships
    @ManyToOne
    @JoinColumn(name="user_id")
    private LagaltUser user;
    @ManyToOne
    @JoinColumn(name="project_id")
    private Project project;
    // Table's method for record info
    public String toString(){
        String userStr = (user == null)? "" : user.getUser_name();
        String projectStr = (project == null)? "" : project.getProject_title();
        return "{ \nid: " + request_id + ", \ntext: " + request_text +
               ", \nuser: " + userStr + ", \nproject: " + projectStr + "  \n}";
    }
}
