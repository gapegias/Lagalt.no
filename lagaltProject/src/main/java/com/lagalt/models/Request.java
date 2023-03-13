package com.lagalt.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "request")
public class Request {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "request_id")
    private int request_id;
    @Column(name = "request_text", nullable = false)
    private String request_text;
    //Relations
    @ManyToOne
    @JoinColumn(name="user_id")
    private LagaltUser user;
    @ManyToOne
    @JoinColumn(name="project_id")
    private Project project;
}
