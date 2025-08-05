package com.example.socalsync.models.dto;

//This class is used to send the data to create the user in MYSQL and register the user in CometChat.
public class RegisterRequest {
    private String name;
    private String email;
    private String password;
    private String cometchatUID;

    //constructor
    public RegisterRequest(String name, String email, String password, String cometchatUID) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.cometchatUID = cometchatUID;
    }

    //getters and setters
    public String getCometchatUID() {return cometchatUID;}
    public void setCometchatUID(String cometchatUID) {this.cometchatUID = cometchatUID;}

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

    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
}
