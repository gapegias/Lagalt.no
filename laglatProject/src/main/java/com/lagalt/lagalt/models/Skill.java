package com.lagalt.lagalt.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Skill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int skill_id;

    @Column(nullable = false)
    private String skill_name;


    //to string method

    @Override
    public String toString() {
        return "Skill{" +
                "id=" + skill_id +
                ", skill_name='" + skill_name + '\'' +
                '}';
    }
}
