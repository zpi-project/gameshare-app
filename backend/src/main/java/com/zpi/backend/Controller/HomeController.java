package com.zpi.backend.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @GetMapping("/")
    public String home(){
        return "Hello World";
    }

    @GetMapping("/home2")
    public String homeAuthenticated(){
        return "Hello";
    }

}
