package com.lagalt.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.sql.Timestamp;
import java.util.Set;
import java.util.stream.Collectors;

@Entity
@Getter
@Setter
@Table(name = "message")
public class Message {

    // Table's columns
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "message_id")
    private int  message_id;
    @Column(name = "message_text")
    private String message_text;
    @Column(name = "message_timestamp", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Timestamp message_timestamp;
    @Column(name = "message_user_name", length = 50)
    private String message_user_name;

    //Table's relationships
    @ManyToMany(mappedBy = "messages") // owned
    private Set<Project> projects;

    // Table's method for record info
    public String toString(){
        String projectStr = projects.stream()
                                    .map(project -> project.getProject_title())
                                    .collect(Collectors.toSet())
                                    .toString();
        return "{ \nid: " + message_id + ", \ntext: " + message_text + ", \nuser_name: " + message_user_name +
                ", \ntimestamp: " + message_timestamp + ", \nprojects: " + projectStr + "  \n}";
    }
}
