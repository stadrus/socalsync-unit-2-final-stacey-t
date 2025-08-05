package com.example.socalsync.models.dto;

import com.example.socalsync.models.User;

public class UserResponseDTO {
    private int userId;
    private String name;
    private  String email;
    private String cometchatUID;

    public UserResponseDTO(int userId, String name, String email, String cometchatUID) {
        this.userId = userId;
        this.name = name;
        this.email = email;
        this.cometchatUID = cometchatUID;
    }

    public UserResponseDTO(User user) {
        this.userId = user.getId();
        this.name = user.getName();
        this.email = user.getEmail();
        this.cometchatUID = user.getCometchatUID();
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

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

    public String getCometchatUID() {
        return cometchatUID;
    }

    public void setCometchatUID(String cometchatUID) {
        this.cometchatUID = cometchatUID;
    }
}
