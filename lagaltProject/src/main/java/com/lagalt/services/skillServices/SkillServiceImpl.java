package com.lagalt.services.skillServices;

import com.lagalt.models.LagaltUser;
import com.lagalt.models.Project;
import com.lagalt.models.Skill;
import com.lagalt.repositories.ProjectRepository;
import com.lagalt.repositories.SkillRepository;
import com.lagalt.repositories.UserRepository;
import org.springframework.stereotype.Service;
import java.util.Collection;
import java.util.Set;

@Service
public class SkillServiceImpl implements SkillService{
    private final SkillRepository skillRepository;
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;
    public SkillServiceImpl(SkillRepository skillRepository, ProjectRepository projectRepository, UserRepository userRepository) {
        this.skillRepository = skillRepository;
        this.projectRepository = projectRepository;
        this.userRepository = userRepository;
    }
    @Override
    public Skill findById(Integer id) {
        return skillRepository.findById(id).orElse(null);
    }
    @Override
    public Collection<Skill> findAll() {
        return skillRepository.findAll();
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
    public void deleteById(Integer id) {
        if(this.skillRepository.existsById(id)){
            Skill skill = this.skillRepository.findById(id).get();
            // Remove skill from projects' set
            for(Project project : this.projectRepository.findAll())
                if(project.getSkills().contains(skill)){
                    Set<Skill> skillSet = project.getSkills();
                    skillSet.remove(skill);
                    project.setSkills(skillSet);
                }
            // Remove skill from users' set
            for(LagaltUser user : this.userRepository.findAll())
                if(user.getSkills().contains(skill)){
                    Set<Skill> skillSet = user.getSkills();
                    skillSet.remove(skill);
                    user.setSkills(skillSet);
                }
            this.skillRepository.deleteById(id);
        }
    }
    @Override
    public boolean exists(Integer id) {
        return this.skillRepository.existsById(id);
    }
}
