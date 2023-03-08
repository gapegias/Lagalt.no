package com.lagalt.lagalt.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class LagaltUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int lagalt_user_id;
    @Column(nullable = false)
    private String lagalt_user_name;



    //to string method
    @Override
    public String toString() {
        return "LagaltUser{" +
                "lagalt_user_id=" + lagalt_user_id +
                ", lagalt_user_name='" + lagalt_user_name + '\'' +
                '}';
    }
}
