package com.lagalt.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.sql.Timestamp;

@Entity
@Getter
@Setter
@Table(name = "message")
public class Message {
    // Constructor
    public Message(){
        message_text = "Dummy";
        message_timestamp = new Timestamp(System.currentTimeMillis());
        user = null;
        project = null;
    }
    // Table's columns
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "message_id", nullable = false)
    private int  message_id;
    @Column(name = "message_text", nullable = false)
    private String message_text;
    @Column(name = "message_timestamp", nullable = false, updatable = false, insertable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Timestamp message_timestamp;
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
        return "{ \nid: " + message_id + ", \ntext: " + message_text + ", \ntimestamp: " + message_timestamp +
               ", \nuser: " + userStr + ", \nproject: " + projectStr + "  \n}";
    }
}
