package com.lagalt.controllers;


import com.lagalt.models.LagaltUser;
import com.lagalt.services.userServices.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

@RestController
@RequestMapping(path = "/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity findAll(){
        return ResponseEntity.ok(userService.findAll());
    }

    @GetMapping({"{id}"})
    public ResponseEntity findByID(@PathVariable int id){
        return ResponseEntity.ok(userService.findById(id));
    }

    @PostMapping
    public ResponseEntity add(@RequestBody LagaltUser user) throws URISyntaxException {
        //Add User
        userService.add(user);
        URI uri = new URI("users/"+ user.getUser_id());


        return ResponseEntity.created(uri).build();
    }

    @DeleteMapping(value="/{user_id}")
    public void deleteUser(@PathVariable("user_id") int user_id){
        userService.deleteById(user_id);
    }

    @GetMapping("{userId}/skills")
    public ResponseEntity findSkillsOfUser(@PathVariable int userId){
        return ResponseEntity.ok(userService.findSkillsOfUser(userId));
    }
    @GetMapping({"{userId}/skills/{skillId}"})
    public ResponseEntity findSkillByIdOfUser(@PathVariable int userId, @PathVariable int skillId){
        return ResponseEntity.ok(userService.findSkillByIdOfUser(userId, skillId));
    }
    ////////////////////////////
    @GetMapping("{userId}/projects")
    public ResponseEntity findProjectsOfUser(@PathVariable int userId){
        return ResponseEntity.ok(userService.findProjectsOfUser(userId));
    }
    @GetMapping({"{userId}/projects/{projectId}"})
    public ResponseEntity findProjectByIdOfUser(@PathVariable int userId, @PathVariable int projectId){
        return ResponseEntity.ok(userService.findProjectByIdOfUser(userId, projectId));
    }


}
