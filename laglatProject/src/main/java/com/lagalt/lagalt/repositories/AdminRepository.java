package com.lagalt.lagalt.repositories;

import com.lagalt.lagalt.models.Admin_project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminRepository extends JpaRepository<Admin_project, Integer> {
}
