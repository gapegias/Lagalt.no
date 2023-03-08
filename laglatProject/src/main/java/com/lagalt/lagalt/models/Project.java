package com.lagalt.lagalt.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

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

    private String stage;

    private String repo_url;


    //to string method
    @Override
    public String toString() {
        return "Project{" +
                "project_id=" + project_id +
                ", title='" + title + '\'' +
                ", topic='" + topic + '\'' +
                ", stage='" + stage + '\'' +
                ", url='" + repo_url + '\'' +
                '}';
    }
}
