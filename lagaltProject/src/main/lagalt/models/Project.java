package com.lagalt.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.util.Set;
import java.util.stream.Collectors;

@Entity
@Getter
@Setter
@Table(name = "project")
public class Project {

    // Table's columns
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "project_id")
    private int project_id;
    @Column(name = "project_title", length = 50, unique = true)
    private String project_title;
    @Column(name = "project_purpose")
    private String project_purpose;
    @Column(name = "project_stage", columnDefinition = "varchar(30) default 'initial'")
    private String project_stage;
    @Column(name = "project_repo_url")
    private String project_repo_url;
    @Column(name = "project_owner", length = 50)
    private String project_owner;

    // Table's relationships
    @ManyToMany // owner
    @JoinTable(
            name = "lagalt_user_projects",
            joinColumns = {@JoinColumn(name = "project_id")},
            inverseJoinColumns = {@JoinColumn(name = "user_id")}
    )
    private Set<LagaltUser> users;
    @ManyToOne // owner
    @JoinColumn(name = "topic_id")
    private Topic topic;
    @ManyToMany // owner
    @JoinTable(
            name = "project_skills",
            joinColumns =  {@JoinColumn(name = "project_id")},
            inverseJoinColumns = {@JoinColumn(name = "skill_id")}
    )
    private Set<Skill> skills;
    @ManyToMany // owner
    @JoinTable(
            name = "request_projects",
            joinColumns =  {@JoinColumn(name = "project_id")},
            inverseJoinColumns = {@JoinColumn(name = "request_id")}
    )
    private Set<Request> requests;
    @ManyToMany // owner
    @JoinTable(
            name = "message_projects",
            joinColumns =  {@JoinColumn(name = "project_id")},
            inverseJoinColumns = {@JoinColumn(name = "message_id")}
    )
    private Set<Message> messages;

    // Table's method for record info
    public String toString(){
        String usersStr = users.stream()
                               .map(user -> user.getUser_name())
                               .collect(Collectors.toSet())
                               .toString();
        String skillsStr = skills.stream()
                                 .map(skill -> skill.getSkill_name())
                                 .collect(Collectors.toSet())
                                 .toString();
        String requestsStr = requests.stream()
                                     .map(request -> request.getRequest_text())
                                     .collect(Collectors.toSet())
                                     .toString();
        String messagesStr = messages.stream()
                                     .map(message -> message.getMessage_text())
                                     .collect(Collectors.toSet())
                                     .toString();
        return "{ \nid: " + project_id + ", \nowner: " + project_owner + ", \nstage: " + project_stage +
               ", \ntitle: " + project_title + ", \npurpose: " + project_purpose + ", \nrepo: " + project_repo_url +
               ", \ntopic: " + topic.getTopic_name() + ", \nusers: "+ usersStr + ", \nskills: " + skillsStr +
               ", \nrequests: " + requestsStr + ", \nmessages: " + messagesStr + " \n}";
    }
}
