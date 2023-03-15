package com.lagalt.models.DTOs.SkillDTOs;

import jakarta.persistence.Column;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SkillNameDTO {
    // Constructor
    public SkillNameDTO(String skill_name){

        this.skill_name = skill_name;
    }

    private String skill_name;
}