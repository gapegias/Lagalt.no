package com.lagalt.runner;

import com.lagalt.models.LagaltUser;
import com.lagalt.services.userServices.UserService;
import jakarta.transaction.Transactional;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import java.util.ArrayList;
import java.util.List;

@Component
public class UserRunner implements CommandLineRunner {
    private final UserService userService;
    public UserRunner(UserService userService) {
        this.userService = userService;
    }
    @Override
    @Transactional
    public void run(String... args) throws Exception {

        // Get a user by id
        System.out.println(this.userService.findById(1).toString()); // exists
        System.out.println(this.userService.findById(5));            // not exists

        // Get all users
        List<String> users = new ArrayList<>(this.userService.findAll().stream().map(user -> user.toString()).toList());
        users.forEach(user -> System.out.println(user));

        // Add a user (with user_name = "Dummy" and others empty collections)
        System.out.println(this.userService.add(new LagaltUser()).toString());

        // Update a user (with user_id = 5 by changing user_name from "Dummy" to "Dummy-Dummy")
        LagaltUser lagalt_user = this.userService.findById(5);
        lagalt_user.setUser_name("Dummy-Dummy");
        System.out.println(this.userService.update(lagalt_user).toString());

        // Delete a user (with id = 2)
        this.userService.deleteById(2);
        users = new ArrayList<>(this.userService.findAll().stream().map(user -> user.toString()).toList());
        users.forEach(user -> System.out.println(user));

        // Check if a user by id exists (with id = 6)
        System.out.println(this.userService.exists(1)); // exists
        System.out.println(this.userService.exists(6)); // not exists
    }
}
