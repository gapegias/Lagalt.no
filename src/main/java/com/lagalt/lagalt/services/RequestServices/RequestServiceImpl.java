package com.lagalt.lagalt.services.RequestServices;

import com.lagalt.lagalt.models.Request;
import com.lagalt.lagalt.repositories.RequestRepository;

import java.util.Collection;

public class RequestServiceImpl implements RequestService{

    private final RequestRepository requestRepository;

    public RequestServiceImpl(RequestRepository requestRepository) {
        this.requestRepository = requestRepository;
    }

    @Override
    public Request findById(Integer integer) {
        return requestRepository.findById(integer).get();
    }

    @Override
    public Collection<Request> findAll() {
        return requestRepository.findAll();
    }

    @Override
    public Request add(Request entity) {
        return requestRepository.save(entity);
    }

    @Override
    public Request update(Request entity) {
        return requestRepository.save(entity);
    }

    @Override
    public void deleteByID(Integer integer) {

    }

    @Override
    public void delete(Request entity) {

    }
}
