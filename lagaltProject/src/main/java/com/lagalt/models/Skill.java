package com.lagalt.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.util.Set;

@Entity
@Getter
@Setter
@Table(name = "skill")
public class Skill {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "skill_id")
    private int skill_id;
    @Column(name = "skill_name", length = 50, nullable = false, unique = true)
    private String skill_name;
    //Relationships
    @ManyToMany(mappedBy = "skills")  //direction
    private Set<LagaltUser> users;
    @ManyToMany(mappedBy = "skills")  //direction
    private Set<Project> projects;
}
