package com.lagalt.lagalt.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Admin_project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int user_project_admin_id;

    //Relations
    @ManyToOne
    @JoinColumn(name="user_id")
    private LagaltUser lagaltUsers;


    @ManyToOne
    @JoinColumn(name="project_id")
    private Project project;



   // private boolean admin;
}

