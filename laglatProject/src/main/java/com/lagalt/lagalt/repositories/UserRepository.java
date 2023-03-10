
package com.lagalt.lagalt.repositories;

import com.lagalt.lagalt.models.LagaltUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<LagaltUser, Integer> {

}