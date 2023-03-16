package com.lagalt.models.DTOs.RequestsDTOs;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RequestDTO {
    // Constructor
    public RequestDTO(int request_id, String request_text, int request_user_id, String request_user_name){
        this.request_id = request_id;
        this.request_text = request_text;
        this.request_user_id = request_user_id;
        this.request_user_name = request_user_name;
    }
    private int request_id;
    private String request_text;
    private int request_user_id;
    private String request_user_name;
}
