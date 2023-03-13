package com.lagalt.runners;

import com.lagalt.models.Message;
import com.lagalt.services.messageServices.MessageService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import java.util.List;
import java.util.ArrayList;

@Component
public class MessageRunner implements CommandLineRunner {
    private final MessageService messageService;
    public MessageRunner(MessageService messageService) {
        this.messageService = messageService;
    }
    @Override
    public void run(String... args) throws Exception {

        // Get a message by id (with id = 1, id = 5)
        System.out.println(this.messageService.findById(1).toString()); // exists
        System.out.println(this.messageService.findById(5));            // not exists

        // Get all messages
        List<String> messages = new ArrayList<>(this.messageService.findAll().stream().map(message -> message.toString()).toList());
        messages.forEach(message -> System.out.println(message));

        // Add a message (with message_text = "Dummy" and others null)
        System.out.println(this.messageService.add(new Message()).toString());

        // Update a message (with id = 5 by changing message_text from "Dummy" to "Dummy-Dummy")
        Message m = this.messageService.findById(5);
        m.setMessage_text("Dummy-Dummy");
        System.out.println(this.messageService.update(m).toString());

        // Delete a message (with id = 2)
        this.messageService.deleteById(2);
        messages = new ArrayList<>(this.messageService.findAll().stream().map(message -> message.toString()).toList());
        messages.forEach(message -> System.out.println(message));

        // Check if a message by id exists (with id =1, id = 6)
        System.out.println(this.messageService.exists(1)); // exists
        System.out.println(this.messageService.exists(6)); // not exists

    }
}
