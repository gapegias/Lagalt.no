//package com.lagalt.lagalt.models;
//
//import jakarta.persistence.*;
//
//import java.io.Serializable;
//
//@Embeddable
//public class lagalt_user_projects_key implements Serializable {
//    private Long lagalt_user_id;
//    private Long project_id;
//
//    // constructors, getters and setters
//}
//
//@Entity
//public class lagalt_user_projects {
//    @EmbeddedId
//    private lagalt_user_projects id;
//
//    @ManyToOne
//    @MapsId("lagalt_user_id")
//    private  LagaltUser lagalt_user_id;
//
//    @ManyToOne
//    @MapsId("bId")
//    private Project project;
//
//    // getters and setters
//}
