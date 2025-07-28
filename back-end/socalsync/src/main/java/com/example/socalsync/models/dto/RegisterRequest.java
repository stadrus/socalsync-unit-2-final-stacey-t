package com.example.socalsync.models.dto;

//This class is used to send the data to create the user in MYSQL and register the user in CometChat.

public class RegisterRequest {
    private String name;
    private String email;
    private String username;
    private String password;

    //constructors

    public RegisterRequest() {
    }

    public RegisterRequest(String password, String username, String email, String name) {
        this.password = password;
        this.username = username;
        this.email = email;
        this.name = name;
    }

    //getters and setters

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
