package com.lagalt.controllers;

import com.lagalt.models.Message;
import com.lagalt.services.messageServices.MessageService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.net.URI;
import java.net.URISyntaxException;

@RestController
@RequestMapping("/messages")
public class MessageController {

    // Variables
    private final MessageService messageService;

    // Constructor
    public MessageController(MessageService messageService) {
        this.messageService = messageService;
    }

    // Message's requests
    @GetMapping
    public ResponseEntity findAllMessages(){
        return ResponseEntity.ok(this.messageService.findAllMessages());
    }
    @GetMapping({"{message_id}"})
    public ResponseEntity findMessageById(@PathVariable int message_id){
        return ResponseEntity.ok(this.messageService.findMessageById(message_id));
    }
    @PostMapping
    public ResponseEntity addMessage(@RequestBody Message message) throws URISyntaxException {
        this.messageService.add(message); // Add Message
        URI uri = new URI("messages/"+ message.getMessage_id());
        return ResponseEntity.created(uri).build();
    }
    @PutMapping("{message_id}")
    public ResponseEntity updateSkill(@RequestBody Message message){
        this.messageService.update(message); // Add Message
        return ResponseEntity.noContent().build();
    }
    @DeleteMapping(value="/{message_id}")
    public void deleteSkill(@PathVariable int message_id){
        this.messageService.deleteById(message_id);
    }
}
