package com.lagalt.models.DTOs.MessageDTOs;

import lombok.Getter;
import lombok.Setter;
import java.sql.Timestamp;

@Getter
@Setter
public class MessageDTO {
    // Constructor
    public MessageDTO(int message_id, String message_text, Timestamp message_timestamp, String user_name){
        this.message_id = message_id;
        this.message_text = message_text;
        this.message_timestamp = message_timestamp;
        this.user_name = user_name;
    }
    private int message_id;
    private String message_text;
    private Timestamp message_timestamp;
    private String user_name;
}
