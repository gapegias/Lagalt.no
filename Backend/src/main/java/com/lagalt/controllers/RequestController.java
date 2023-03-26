package com.lagalt.controllers;

import com.lagalt.models.Request;
import com.lagalt.services.requestServices.RequestService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.net.URI;
import java.net.URISyntaxException;

@RestController
@RequestMapping("/requests")
public class RequestController {

    // Variables
    private final RequestService requestService;

    // Constructor
    public RequestController(RequestService requestService) {
        this.requestService = requestService;
    }

    // Request's requests
    @GetMapping
    public ResponseEntity findAllRequests(){
        return ResponseEntity.ok(this.requestService.findAllRequests());
    }
    @GetMapping({"{request_id}"})
    public ResponseEntity findMessageById(@PathVariable int request_id){
        return ResponseEntity.ok(this.requestService.findRequestById(request_id));
    }
    @PostMapping
    public ResponseEntity addRequest(@RequestBody Request request) throws URISyntaxException {
        this.requestService.add(request); // Add Request
        URI uri = new URI("requests/"+ request.getRequest_id());
        return ResponseEntity.created(uri).build();
    }
    @PutMapping("{request_id}")
    public ResponseEntity updateRequest(@RequestBody Request request){
        this.requestService.update(request); // Add Request
        return ResponseEntity.noContent().build();
    }
    @DeleteMapping(value="/{request_id}")
    public void deleteSkill(@PathVariable int request_id){
        this.requestService.deleteById(request_id);
    }
}
