package com.lagalt.lagalt.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class User_Project_Admin {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int user_project_admin_id;

    @ManyToOne
    @JoinTable(name = "lagalt_user_project",
            joinColumns = @JoinColumn(name = "a_id"),
            inverseJoinColumns = @JoinColumn(name = "b_id"))
    private lagalt_user_projects lagaltUserProjects;
}
