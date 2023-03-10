package com.lagalt.lagalt.runner;

import com.lagalt.lagalt.services.UserServices.UserService;
import jakarta.transaction.Transactional;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class pgRunner implements CommandLineRunner {

    private final UserService userService;

    public pgRunner(UserService userService) {
        this.userService = userService;
    }

    @Override
    @Transactional
    public void run(String... args) throws Exception {



    }
}
