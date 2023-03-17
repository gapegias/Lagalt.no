package com.lagalt.models.DTOs.SkillDTOs;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SkillDTO {
    // Constructor
    public SkillDTO(int skill_id, String skill_name){
        this.skill_id = skill_id;
        this.skill_name = skill_name;
    }
    private int skill_id;
    private String skill_name;
}
