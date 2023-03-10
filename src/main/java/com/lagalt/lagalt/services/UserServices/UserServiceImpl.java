package com.lagalt.lagalt.services.UserServices;

import com.lagalt.lagalt.models.LagaltUser;
import com.lagalt.lagalt.repositories.UserRepository;
import com.lagalt.lagalt.services.UserServices.UserService;
import org.springframework.stereotype.Service;

import java.util.Collection;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public LagaltUser findById(Integer integer) {
        return userRepository.findById(integer).get();
    }

    @Override
    public Collection<LagaltUser> findAll() {
        return userRepository.findAll();
    }

    @Override
    public LagaltUser add(LagaltUser entity) {
        return userRepository.save(entity);
    }

    @Override
    public LagaltUser update(LagaltUser entity) {
        return userRepository.save(entity);
    }

    @Override
    public void deleteByID(Integer integer) {
        if(userRepository.existsById(integer)){
            LagaltUser lagaltUser = userRepository.findById(integer).get();
            lagaltUser.setSkills(null);   //maybe some more implementations
            userRepository.delete(lagaltUser);

        }

    }

    @Override
    public void delete(LagaltUser entity) {

    }
}
