package com.lagalt.models.DTOs.LagaltUserDTOs;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LagaltUserDTO {
    // Constructor
    public LagaltUserDTO(int user_id, String user_name){
        this.user_id = user_id;
        this.user_name = user_name;
    }
    private int user_id;
    private String user_name;
}
