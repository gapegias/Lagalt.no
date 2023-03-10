package com.lagalt.lagalt.repositories;


import com.lagalt.lagalt.models.Topics;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TopicsRepository extends JpaRepository<Topics, Integer> {
}
