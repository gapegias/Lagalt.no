package com.lagalt;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class LagaltProjectApplication {
    public static void main(String[] args) {
        SpringApplication.run(LagaltProjectApplication.class, args);
    }
    
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**").allowedOrigins("https://legalt-nt3460du8-gapegias.vercel.app").allowedMethods("HEAD", "GET", "PUT", "POST", "DELETE", "PATCH");
              
            }
        };
    }
}
