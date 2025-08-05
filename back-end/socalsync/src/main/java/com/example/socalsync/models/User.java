package com.example.socalsync.models;

import jakarta.persistence.*;

import java.util.List;


@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    private String email;
    private String password;
    private String cometchatUID;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Event> events;

    //constructors

    public User() {
    }

    public User(String name, String email, String password, String cometchatUID) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.cometchatUID = cometchatUID;
    }

    public User(int id) {
        this.id =id;
    }
//getters and setters


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {return name;}

    public void setName(String name) {this.name = name;}

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

    public String getCometchatUID() {return cometchatUID;}

    public void setCometchatUID(String cometchatUID) {this.cometchatUID = cometchatUID;}

}
