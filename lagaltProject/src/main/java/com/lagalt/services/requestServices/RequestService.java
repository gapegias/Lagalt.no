package com.lagalt.services.requestServices;

import com.lagalt.models.DTOs.RequestsDTOs.RequestDTO;
import com.lagalt.models.Request;
import com.lagalt.services.CRUDService;
import java.util.Collection;

public interface RequestService extends CRUDService<Request, Integer> {

    // Request's extra methods
    RequestDTO findRequestById(Integer request_id);
    Collection<RequestDTO> findAllRequests();
}
