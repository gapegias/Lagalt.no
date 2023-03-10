package com.lagalt.lagalt.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Collection;
import java.util.Set;

@Entity
@Getter
@Setter
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private int project_id;
    @Column(nullable = false, length = 100)
    private String title;
    @Column(nullable = false)
    private String topic;


    @Column(name = "stage", nullable = false, insertable = false,
            columnDefinition = "varchar(30) default 'initial'")
    private String stage;

    private String repo_url;


    //Relationships
    @ManyToMany //owner
    @JoinTable(
            joinColumns =
                    {@JoinColumn(name = "project_id")},
            inverseJoinColumns =
                    {@JoinColumn(name = "skill_id")}
    )
    private Set<Skill> skills;

    @ManyToMany(mappedBy = "projects")  //direction
    private Set<LagaltUser> lagaltUsers;

    @OneToMany(mappedBy="project", fetch = FetchType.EAGER)
    private Collection<Request> requests_1;

}
