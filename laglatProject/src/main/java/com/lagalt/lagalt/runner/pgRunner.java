package com.lagalt.lagalt.runner;

import com.lagalt.lagalt.models.LagaltUser;
import com.lagalt.lagalt.repositories.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class pgRunner implements CommandLineRunner {

    private final UserRepository userRepository;

    public pgRunner(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    @Transactional
    public void run(String... args) throws Exception {

        LagaltUser lagaltUser = userRepository.findById(1).get();
        System.out.println(lagaltUser.getSkills());

    }
}
