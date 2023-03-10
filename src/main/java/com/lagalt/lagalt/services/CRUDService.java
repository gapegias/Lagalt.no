package com.lagalt.lagalt.services;

import java.util.Collection;

public interface CRUDService <T, ID>{
    //Generic CRUD
    T findById(ID id);
    Collection<T> findAll();
    T add(T entity);
    T update(T entity);
    void deleteByID(ID id);
    void delete(T entity);
}
