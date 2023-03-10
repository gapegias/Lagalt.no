package com.lagalt.lagalt.services.SkillServices;

import com.lagalt.lagalt.models.Skill;
import com.lagalt.lagalt.repositories.SkillRepository;

import java.util.Collection;

public class SkillServiceImpl implements SkillService{

    private final SkillRepository skillRepository;

    public SkillServiceImpl(SkillRepository skillRepository) {
        this.skillRepository = skillRepository;
    }

    @Override
    public Skill findById(Integer integer) {
        return skillRepository.findById(integer).get();
    }

    @Override
    public Collection<Skill> findAll() {
        return skillRepository.findAll();
    }

    @Override
    public Skill add(Skill entity) {
        return skillRepository.save(entity);
    }

    @Override
    public Skill update(Skill entity) {
        return skillRepository.save(entity);
    }

    @Override
    public void deleteByID(Integer integer) {

    }

    @Override
    public void delete(Skill entity) {

    }
}
