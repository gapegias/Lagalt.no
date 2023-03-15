package com.lagalt.controllers;


import com.lagalt.models.Project;
import com.lagalt.models.Skill;
import com.lagalt.services.skillServices.SkillService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

@RestController
@RequestMapping("/skills")
public class SkillsController {

    private final SkillService skillService;

    public SkillsController(SkillService skillService) {
        this.skillService = skillService;
    }

    @GetMapping
    public ResponseEntity findAll(){

        return ResponseEntity.ok(skillService.findAll());
    }

    @GetMapping({"{id}"})
    public ResponseEntity findByID(@PathVariable int id){

        return ResponseEntity.ok(skillService.findById(id));
    }

    @PostMapping
    public ResponseEntity add(@RequestBody Skill skill) throws URISyntaxException {
        //Add User
        skillService.add(skill);
        URI uri = new URI("skills/"+ skill.getSkill_id());


        return ResponseEntity.created(uri).build();
    }
    @DeleteMapping(value="/{skill_id}")
    public void deleteSkill(@PathVariable("skill_id") int skill_id){
        skillService.deleteById(skill_id);
    }
}
