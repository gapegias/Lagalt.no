package com.lagalt.lagalt.services.TopicsServices;

import com.lagalt.lagalt.models.Topics;
import com.lagalt.lagalt.repositories.TopicsRepository;

import java.util.Collection;

public class TopicsServiceImpl implements TopicsService{

    private final TopicsRepository topicsRepository;

    public TopicsServiceImpl(TopicsRepository topicsRepository) {
        this.topicsRepository = topicsRepository;
    }

    @Override
    public Topics findById(Integer integer) {
        return topicsRepository.findById(integer).get();
    }

    @Override
    public Collection<Topics> findAll() {
        return topicsRepository.findAll();
    }

    @Override
    public Topics add(Topics entity) {
        return topicsRepository.save(entity);
    }

    @Override
    public Topics update(Topics entity) {
        return topicsRepository.save(entity);
    }

    @Override
    public void deleteByID(Integer integer) {

    }

    @Override
    public void delete(Topics entity) {

    }
}
