package com.lagalt.services.messageServices;

import com.lagalt.models.DTOs.MessageDTOs.MessageDTO;
import com.lagalt.models.Message;
import com.lagalt.models.Project;
import com.lagalt.repositories.MessageRepository;
import com.lagalt.repositories.ProjectRepository;
import com.lagalt.repositories.UserRepository;
import com.lagalt.services.Transformer;
import org.springframework.stereotype.Service;
import java.sql.Timestamp;
import java.util.Collection;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class MessageServiceImpl implements MessageService{

    // Variables
    private final MessageRepository messageRepository;
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

    // Constructor
    public MessageServiceImpl(MessageRepository messageRepository, ProjectRepository projectRepository, UserRepository userRepository) {
        this.messageRepository = messageRepository;
        this.projectRepository = projectRepository;
        this.userRepository = userRepository;
    }

    // Message's crud methods
    // Do not use this (instead use DTO)
    @Override
    public Message findById(Integer message_id) {
        return messageRepository.findById(message_id).get();
    }
    public MessageDTO findMessageById(Integer message_id){
        return Transformer.messageToMessageDTO(findById(message_id));
    }
    // Do not use this (instead use DTO)
    @Override
    public Collection<Message> findAll() {
        return messageRepository.findAll();
    }
    public Collection<MessageDTO> findAllMessages(){
        return Transformer.messageSetToMessageDTOSet(findAll().stream().collect(Collectors.toSet()));
    }
    @Override
    public Message add(Message message) {
        message.setMessage_timestamp(new Timestamp(System.currentTimeMillis()));
        return messageRepository.save(message);
    }
    @Override
    public Message update(Message message) {
        message.setMessage_timestamp(new Timestamp(System.currentTimeMillis()));
        return messageRepository.save(message);
    }
    @Override
    public void deleteById(Integer message_id) {
        if(this.messageRepository.existsById(message_id)){
            Message message = this.messageRepository.findById(message_id).get();
            // Remove message from projects
            for(Project project : this.projectRepository.findAll())
                if(project.getMessages().contains(message)){
                    Set<Message> messageSet = project.getMessages();
                    messageSet.remove(message);
                    project.setMessages(messageSet);
                }
            this.messageRepository.deleteById(message_id);
        }
    }
   // @Override
   public boolean exists(Integer message_id) {
       return this.messageRepository.existsById(message_id);
   }
}
