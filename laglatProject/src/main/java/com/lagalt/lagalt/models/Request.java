package com.lagalt.lagalt.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Collection;
import java.util.Set;

@Entity
@Getter
@Setter
public class Request {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int request_id;

    private String request_text;


    //Relations
    @ManyToOne
    @JoinColumn(name="user_requested_id")
    private LagaltUser lagaltUsers;


    @ManyToOne
    @JoinColumn(name="project_requested_id")
    private Project project;
}
