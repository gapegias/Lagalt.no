package com.lagalt.services.skillServices;

import com.lagalt.models.DTOs.SkillDTOs.SkillDTO;
import com.lagalt.models.LagaltUser;
import com.lagalt.models.Project;
import com.lagalt.models.Skill;
import com.lagalt.repositories.ProjectRepository;
import com.lagalt.repositories.SkillRepository;
import com.lagalt.repositories.UserRepository;
import com.lagalt.services.Transformer;
import org.springframework.stereotype.Service;
import java.util.Collection;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class SkillServiceImpl implements SkillService{

    // Variables
    private final SkillRepository skillRepository;
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

    // Constructor
    public SkillServiceImpl(SkillRepository skillRepository, ProjectRepository projectRepository, UserRepository userRepository) {
        this.skillRepository = skillRepository;
        this.projectRepository = projectRepository;
        this.userRepository = userRepository;
    }

    // Skill's crud methods
    // Do not use this (instead use DTO)
    @Override
    public Skill findById(Integer skill_id) {
        return skillRepository.findById(skill_id).get();
    }
    public SkillDTO findSkillById(Integer skill_id){
        return Transformer.skillToSkillDTO(findById(skill_id));
    }
    // Do not use this (instead use DTO)
    @Override
    public Collection<Skill> findAll() {
        return skillRepository.findAll();
    }
    public Collection<SkillDTO> findAllSkills(){
        return Transformer.skillSetToSkillDTOSet(findAll().stream().collect(Collectors.toSet()));
    }
    @Override
    public Skill add(Skill skill) {
        return skillRepository.save(skill);
    }
    @Override
    public Skill update(Skill skill) {
        return skillRepository.save(skill);
    }
    @Override
    public void deleteById(Integer skill_id) {
        if(this.skillRepository.existsById(skill_id)){
            Skill skill = this.skillRepository.findById(skill_id).get();
            // Remove skill from projects
            for(Project project : this.projectRepository.findAll())
                if(project.getSkills().contains(skill)){
                    Set<Skill> skillSet = project.getSkills();
                    skillSet.remove(skill);
                    project.setSkills(skillSet);
                }
            // Remove skill from users
            for(LagaltUser user : this.userRepository.findAll())
                if(user.getSkills().contains(skill)){
                    Set<Skill> skillSet = user.getSkills();
                    skillSet.remove(skill);
                    user.setSkills(skillSet);
                }
            this.skillRepository.deleteById(skill_id);
        }
    }
    @Override
    public boolean exists(Integer id) {
        return this.skillRepository.existsById(id);
    }
}