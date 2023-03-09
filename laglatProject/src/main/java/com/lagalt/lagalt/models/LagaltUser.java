package com.lagalt.lagalt.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
public class LagaltUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int lagalt_user_id;
    @Column(nullable = false)
    private String lagalt_user_name;


    //Relationships
    @ManyToMany  //owner
    @JoinTable(
            joinColumns =
                    {@JoinColumn(name = "lagalt_user_id")},
            inverseJoinColumns =
                    {@JoinColumn(name = "skill_id")}
    )
    private Set<Skill> skills;

    @ManyToMany //owner
    @JoinTable(
            joinColumns =
                    {@JoinColumn(name = "lagalt_user_id")},
            inverseJoinColumns =
                    {@JoinColumn(name = "project_id")}
    )
    private Set<Project> projects;


    @OneToMany(mappedBy="lagaltUsers", fetch = FetchType.EAGER)
    private Collection<Request> requests;







}
