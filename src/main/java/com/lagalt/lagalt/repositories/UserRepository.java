
package com.lagalt.lagalt.repositories;

import com.lagalt.lagalt.models.LagaltUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<LagaltUser, Integer> {

    //extra functionalitty ex. set skills to user
//    @Modifying
//    @Query("update LagaltUser u set u.skills=?2 where u.lagalt_user_id=?1")
//    void updateUserSkillsByID(int lagalt_user_id, int skills_id);

}