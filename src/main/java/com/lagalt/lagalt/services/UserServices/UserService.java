package com.lagalt.lagalt.services.UserServices;

import com.lagalt.lagalt.models.LagaltUser;
import com.lagalt.lagalt.services.CRUDService;

public interface UserService extends CRUDService<LagaltUser, Integer> {

    //extra busness logic eg. Set skills to User
}
