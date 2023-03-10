package com.lagalt.lagalt.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Topics {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "topic_id")
    private int topic_id;
    @Column(name = "topic_name", nullable = false)
    private String topic_name;
    @ManyToOne
    @JoinColumn(name="project_id")
    private Project project;
}

