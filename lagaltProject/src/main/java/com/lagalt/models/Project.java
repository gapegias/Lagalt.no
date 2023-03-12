package com.lagalt.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Entity
@Getter
@Setter
@Table(name = "project")
public class Project {
    // Constructor
    public Project(){
        project_title = "Dummy";
        project_purpose = null;
        project_stage = "initial";
        project_repo_url = null;
        project_owner = "Dummy";
        users = new HashSet<>();
        topic = new Topic();
        skills = new HashSet<>();
        requests = new HashSet<>();
        messages = new ArrayList<>();
    }
    // Table's columns
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "project_id", nullable = false)
    private int project_id;
    @Column(name = "project_title", nullable = false, length = 50, unique = true)
    private String project_title;
    @Column(name = "project_purpose")
    private String project_purpose;
    @Column(name = "project_stage", nullable = false, insertable = false, columnDefinition = "varchar(30) default 'initial'")
    private String project_stage;
    @Column(name = "project_repo_url")
    private String project_repo_url;
    @Column(name = "project_owner", nullable = false, length = 50)
    private String project_owner;
    // Table's relationships
    @ManyToMany(mappedBy = "projects")  //direction
    private Set<LagaltUser> users;
    @ManyToOne
    @JoinColumn(name = "topic_id")
    private Topic topic;
    @ManyToMany //owner
    @JoinTable(
            name = "project_skills",
            joinColumns =  {@JoinColumn(name = "project_id")},
            inverseJoinColumns = {@JoinColumn(name = "skill_id")}
    )
    private Set<Skill> skills;
    @OneToMany(mappedBy="project", fetch = FetchType.EAGER)
    private Set<Request> requests;
    @OneToMany(mappedBy="project", fetch = FetchType.EAGER)
    private List<Message> messages;
    // Table's method for record info
    public String toString(){
        String usersStr = users.stream().map(user -> user.getUser_name())
                                        .collect(Collectors.joining(", "));
        String skillsStr = skills.stream().map(skill -> skill.getSkill_name())
                                          .collect(Collectors.joining(", "));
        String requestsStr = requests.stream().map(request -> request.getRequest_text())
                                              .collect(Collectors.joining(", "));
        String messagesStr = messages.stream().map(message -> message.getMessage_text())
                                              .collect(Collectors.joining(", "));
        return "{ \nid: " + project_id + ", \nowner: " + project_owner + ", \nstage: " + project_stage +
               ", \ntitle: " + project_title + ", \npurpose: " + project_purpose + ", \nrepo: " + project_repo_url +
               ", \ntopic: " + topic.getTopic_name() + ", \nusers: { "+ usersStr + " }, \nskills: { " + skillsStr +
               " }, \nrequests: { " + requestsStr + " }, \nmessages: { " + messagesStr + " } \n}";
    }
}
