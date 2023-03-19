package com.lagalt.controllers;

import com.lagalt.models.LagaltUser;
import com.lagalt.services.userServices.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.net.URI;
import java.net.URISyntaxException;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "http://localhost:8080/users")
@RestController
@RequestMapping(path = "/users")
public class UserController {

    // Variables
    private final UserService userService;

    // Constructor
    public UserController(UserService userService) {
        this.userService = userService;
    }

    // User's requests
    @GetMapping
    public ResponseEntity findAllUsers(@RequestParam(required = false) String user_name){
        if(user_name == null)
            return ResponseEntity.ok(this.userService.findAllUsers());
        return ResponseEntity.ok(this.userService.findUserByName(user_name));
    }
    @GetMapping({"{user_id}"})
    public ResponseEntity findUserById(@PathVariable int user_id){
        return ResponseEntity.ok(this.userService.findUserById(user_id));
    }
    @PostMapping
    public ResponseEntity addUser(@RequestBody LagaltUser user) throws URISyntaxException {
        this.userService.add(user); //Add User
        URI uri = new URI("users/"+ user.getUser_id());
        return ResponseEntity.created(uri).build();
    }
    @PutMapping("{user_id}")
    public ResponseEntity updateUserPut(@RequestBody LagaltUser user){
        this.userService.add(user); //Add User
        return ResponseEntity.noContent().build();
    }
    @PatchMapping("{user_id}")
    public ResponseEntity updateUserPatch(@RequestBody LagaltUser user){
        this.userService.update(user); //update User
        return ResponseEntity.noContent().build();
    }
    @DeleteMapping(value="/{user_id}")
    public void deleteUser(@PathVariable("user_id") int user_id){
        this.userService.deleteById(user_id);
    }

    // User's skills requests
    @GetMapping("{user_id}/skills")
    public ResponseEntity findSkillsOfUser(@PathVariable int user_id){
        return ResponseEntity.ok(this.userService.findSkillsOfUser(user_id));
    }
    @GetMapping({"{user_id}/skills/{skill_id}"})
    public ResponseEntity findSkillByIdOfUser(@PathVariable int user_id, @PathVariable int skill_id){
        return ResponseEntity.ok(this.userService.findSkillByIdOfUser(user_id, skill_id));
    }

    // User's projects requests
    @GetMapping("{user_id}/projects")
    public ResponseEntity findProjectsOfUser(@PathVariable int user_id){
        return ResponseEntity.ok(this.userService.findProjectsOfUser(user_id));
    }
    @GetMapping({"{user_id}/projects/{project_id}"})
    public ResponseEntity findProjectByIdOfUser(@PathVariable int user_id, @PathVariable int project_id){
        return ResponseEntity.ok(this.userService.findProjectByIdOfUser(user_id, project_id));
    }

}
