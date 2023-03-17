package com.lagalt.services.messageServices;

import com.lagalt.models.DTOs.MessageDTOs.MessageDTO;
import com.lagalt.models.Message;
import com.lagalt.services.CRUDService;

import java.util.Collection;

public interface MessageService extends CRUDService<Message, Integer> {

    // Message's extra methods
    MessageDTO findMessageById(Integer message_id);
    Collection<MessageDTO> findAllMessages();
}
