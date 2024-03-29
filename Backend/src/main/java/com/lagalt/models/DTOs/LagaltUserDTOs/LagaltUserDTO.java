package com.lagalt.models.DTOs.LagaltUserDTOs;

import com.lagalt.models.DTOs.SkillDTOs.SkillDTO;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
public class LagaltUserDTO {
    // Constructor
    public LagaltUserDTO(int user_id, String user_name, String user_about_me, boolean user_hide,
                         Set<SkillDTO> skills){
        this.user_id = user_id;
        this.user_name = user_name;
        this.user_about_me = user_about_me;
        this.user_hide = user_hide;
        this.skills = skills;
    }
    private int user_id;
    private String user_name;
    private String user_about_me;
    private boolean user_hide;
    private Set<SkillDTO> skills;
}
