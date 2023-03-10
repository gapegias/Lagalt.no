package com.lagalt.lagalt.services.MessageServices;

import com.lagalt.lagalt.models.Message;
import com.lagalt.lagalt.repositories.MessageRepository;

import java.util.Collection;

public class MessageServiceImpl implements MessageService{

    private final MessageRepository messageRepository;

    public MessageServiceImpl(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    @Override
    public Message findById(Integer integer) {
        return messageRepository.findById(integer).get();
    }

    @Override
    public Collection<Message> findAll() {
        return messageRepository.findAll();
    }

    @Override
    public Message add(Message entity) {
        return messageRepository.save(entity);
    }

    @Override
    public Message update(Message entity) {
        return messageRepository.save(entity);
    }

    @Override
    public void deleteByID(Integer integer) {

    }

    @Override
    public void delete(Message entity) {

    }
}
