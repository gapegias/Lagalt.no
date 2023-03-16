package com.lagalt.models.DTOs.TopicDTOs;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TopicDTO {
    // Constructor
    public TopicDTO(int topic_id, String topic_name){
        this.topic_id = topic_id;
        this.topic_name = topic_name;
    }
    private int topic_id;
    private String topic_name;
}
