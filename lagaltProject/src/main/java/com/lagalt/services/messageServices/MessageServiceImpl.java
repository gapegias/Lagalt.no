package com.lagalt.services.messageServices;

import com.lagalt.models.LagaltUser;
import com.lagalt.models.Message;
import com.lagalt.models.Project;
import com.lagalt.repositories.MessageRepository;
import com.lagalt.repositories.ProjectRepository;
import com.lagalt.repositories.UserRepository;
import org.springframework.stereotype.Service;
import java.util.Collection;
import java.util.List;

@Service
public class MessageServiceImpl implements MessageService{
    private final MessageRepository messageRepository;
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;
    public MessageServiceImpl(MessageRepository messageRepository, ProjectRepository projectRepository, UserRepository userRepository) {
        this.messageRepository = messageRepository;
        this.projectRepository = projectRepository;
        this.userRepository = userRepository;
    }
    @Override
    public Message findById(Integer id) {
        return messageRepository.findById(id).orElse(null);
    }
    @Override
    public Collection<Message> findAll() {
        return messageRepository.findAll();
    }
    @Override
    public Message add(Message message) {
        return messageRepository.save(message);
    }
    @Override
    public Message update(Message message) {
        return messageRepository.save(message);
    }
    @Override
    public void deleteById(Integer id) {
        if(this.messageRepository.existsById(id)){
            Message message = this.messageRepository.findById(id).get();
            // Remove message from projects' set
            for(Project project : this.projectRepository.findAll())
                if(project.getMessages().contains(message)){
                    List<Message> messageSet = project.getMessages();
                    messageSet.remove(message);
                    project.setMessages(messageSet);
                }
            // Remove message from users' set
            for(LagaltUser user : this.userRepository.findAll())
                if(user.getMessages().contains(message)){
                    List<Message> messageSet = user.getMessages();
                    messageSet.remove(message);
                    user.setMessages(messageSet);
                }
            this.messageRepository.deleteById(id);
        }
    }
   // @Override
   public boolean exists(Integer id) {
       return this.messageRepository.existsById(id);
   }
}
