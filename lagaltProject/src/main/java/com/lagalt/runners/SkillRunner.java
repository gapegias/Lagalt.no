package com.lagalt.runners;

import com.lagalt.models.Skill;
import com.lagalt.services.skillServices.SkillService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class SkillRunner implements CommandLineRunner {
    private final SkillService skillService;
    public SkillRunner(SkillService skillService) {
        this.skillService = skillService;
    }
    @Override
    public void run(String... args) throws Exception {

        // Get a skill by id (with id = 1, id = 7)
        System.out.println(this.skillService.findById(1).toString()); // exists
        System.out.println(this.skillService.findById(7));            // not exists

        // Get all skills
        List<String> skills = new ArrayList<>(this.skillService.findAll().stream().map(skill -> skill.toString()).toList());
        skills.forEach(skill -> System.out.println(skill));

        // Add a skill (with skill_name = "Dummy" and others empty collections)
        System.out.println(this.skillService.add(new Skill()).toString());

        // Update a skill (with id = 7 by changing skill_name from "Dummy" to "Dummy-Dummy")
        Skill s = this.skillService.findById(7);
        s.setSkill_name("Dummy-Dummy");
        System.out.println(this.skillService.update(s).toString());

        // Delete a skill (with id = 1)
        this.skillService.deleteById(1);
        skills = new ArrayList<>(this.skillService.findAll().stream().map(skill -> skill.toString()).toList());
        skills.forEach(skill -> System.out.println(skill));

        // Check if a user by id exists (with id = 1, id = 8)
        System.out.println(this.skillService.exists(1)); // exists
        System.out.println(this.skillService.exists(8)); // not exists
    }
}
