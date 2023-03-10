package com.lagalt.lagalt.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;


import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
public class Skill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int skill_id;

    @Column(nullable = false)
    private String skill_name;


    //Relationships
    @ManyToMany(mappedBy = "skills")  //direction
    private Set<LagaltUser> lagaltUsers;

    @ManyToMany(mappedBy = "skills")  //direction
    private Set<Project> projects;





}
