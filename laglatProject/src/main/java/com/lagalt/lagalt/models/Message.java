package com.lagalt.lagalt.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.sql.Date;
import java.sql.Timestamp;

@Entity
@Getter
@Setter
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private int  message_id;
    @Column(nullable = false)
    private String text;

    @Column(name = "timestamp", nullable = false, updatable = false, insertable = false,
            columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Timestamp date;

    //relations
    @ManyToOne
    @JoinColumn(name="user_id")
    private LagaltUser lagaltUsers;


    @ManyToOne
    @JoinColumn(name="project_id")
    private Project project;


}
