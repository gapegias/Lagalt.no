package com.lagalt.lagalt.services.AdminServices;

import com.lagalt.lagalt.models.Admin_project;
import com.lagalt.lagalt.repositories.AdminRepository;

import java.util.Collection;

public class AdminServiceImpl implements AdminService{

    private final AdminRepository adminRepository;

    public AdminServiceImpl(AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }

    @Override
    public Admin_project findById(Integer integer) {
        return adminRepository.findById(integer).get();
    }

    @Override
    public Collection<Admin_project> findAll() {
        return adminRepository.findAll();
    }

    @Override
    public Admin_project add(Admin_project entity) {
        return adminRepository.save(entity);
    }

    @Override
    public Admin_project update(Admin_project entity) {
        return adminRepository.save(entity);
    }

    @Override
    public void deleteByID(Integer integer) {

    }

    @Override
    public void delete(Admin_project entity) {

    }
}
