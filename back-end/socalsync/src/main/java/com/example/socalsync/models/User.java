package com.example.socalsync.models;

import jakarta.persistence.*;

@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    //columns for table
    @Column(nullable = true)
    private String cometchatUID;
    @Column(name = "username")
    private String username;
    @Column(name = "email")
    private String email;
    @Column(name = "password")
    private String password;

    //constructors

    public User( ) {};

    public User (String cometchatUID) {
        this.cometchatUID = cometchatUID;
    }
    public User(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }

    public User(int id) {
        this.id = id;

    }

    //getters and setters

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String description) {
        this.email = description;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString () {
        return "<p><b>NAME<b>: "+ username +"<p>" +
                "<p><b>EMAIL<b>: "+ email +"<p>";
    }

    public String getCometchatUID() {
        return cometchatUID;
    }

    public void setCometchatUID(String cometchatUID) {
        this.cometchatUID = cometchatUID;
    }
}
