package com.lagalt.controllers;

import com.lagalt.models.Skill;
import com.lagalt.services.skillServices.SkillService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.net.URI;
import java.net.URISyntaxException;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "http://localhost:8080/skills")
@RestController
@RequestMapping("/skills")
public class SkillsController {

    // Variables
    private final SkillService skillService;

    // Constructor
    public SkillsController(SkillService skillService) {
        this.skillService = skillService;
    }

    // Skill's requests
    @GetMapping
    public ResponseEntity findAllSkills(){
        return ResponseEntity.ok(this.skillService.findAllSkills());
    }
    @GetMapping({"{skill_id}"})
    public ResponseEntity findSkillById(@PathVariable int skill_id){
        return ResponseEntity.ok(this.skillService.findSkillById(skill_id));
    }
    @PostMapping
    public ResponseEntity addSkill(@RequestBody Skill skill) throws URISyntaxException {
        this.skillService.add(skill); // Add Skill
        URI uri = new URI("skills/"+ skill.getSkill_id());
        return ResponseEntity.created(uri).build();
    }
    @PutMapping("{skill_id}")
    public ResponseEntity updateSkill(@RequestBody Skill skill){
        this.skillService.update(skill);
        return ResponseEntity.noContent().build();
    }
    @DeleteMapping(value="/{skill_id}")
    public void deleteSkill(@PathVariable("skill_id") int skill_id){
        this.skillService.deleteById(skill_id);
    }
}
