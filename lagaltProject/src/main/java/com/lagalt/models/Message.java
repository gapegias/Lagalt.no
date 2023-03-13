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
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "message_id", nullable = false)
    private int  message_id;
    @Column(name = "message_text", nullable = false)
    private String message_text;
    @Column(name = "message_timestamp", nullable = false, updatable = false, insertable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Timestamp message_timestamp;
    //Relationships
    @ManyToOne
    @JoinColumn(name="user_id")
    private LagaltUser user;
    @ManyToOne
    @JoinColumn(name="project_id")
    private Project project;
}
