package com.lagalt.runners;

import com.lagalt.models.Request;
import com.lagalt.services.requestServices.RequestService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import java.util.List;
import java.util.ArrayList;

@Component
public class RequestRunner implements CommandLineRunner {
    private final RequestService requestService;
    public RequestRunner(RequestService requestService) {
        this.requestService = requestService;
    }
    @Override
    public void run(String... args) throws Exception {

        // Get a request by id (with id = 1, id = 3)
        System.out.println(this.requestService.findById(1).toString()); // exists
        System.out.println(this.requestService.findById(3));            // not exists

        // Get all requests
        List<String> requests = new ArrayList<>(this.requestService.findAll().stream().map(request -> request.toString()).toList());
        requests.forEach(request -> System.out.println(request));

        // Add a request (with request_text = "Dummy" and others null)
        System.out.println(this.requestService.add(new Request()).toString());

        // Update a request (with id = 3 by changing request_text from "Dummy" to "Dummy-Dummy")
        Request r = this.requestService.findById(3);
        r.setRequest_text("Dummy-Dummy");
        System.out.println(this.requestService.update(r).toString());

        // Delete a request (with id = 2)
        this.requestService.deleteById(2);
        requests = new ArrayList<>(this.requestService.findAll().stream().map(request -> request.toString()).toList());
        requests.forEach(request -> System.out.println(request));

        // Check if a request by id exists (with id = 1, id = 4)
        System.out.println(this.requestService.exists(1)); // exists
        System.out.println(this.requestService.exists(4)); // not exists

    }
}
