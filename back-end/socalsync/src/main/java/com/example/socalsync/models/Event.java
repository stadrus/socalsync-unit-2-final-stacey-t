package com.example.socalsync.models;



import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

@Entity
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int eventId;
    private String title;
    private String description;
    private LocalDate date;
    private String location;


    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;


    //constructor
    public Event() {
    }

    public Event(int eventId, String title, String description, LocalDate date, String location, User user) {
        this.eventId = eventId;
        this.title = title;
        this.description = description;
        this.date = date;
        this.location = location;
        this.user = user;
    }

    //getters and setters
    public int getEventId() {return eventId;}

    public void setEventId(int eventId) {
        this.eventId = eventId;
    }

    public User getUser() {return user;}
    public void setUser(User user) {this.user = user;}

    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDate getDate() {return date;}

    public void setDate(LocalDate date) {this.date = date;}

    public String getLocation() {return location;}

    public void setLocation(String location) {this.location = location;}

    @Override
    public String toString() {
        return "Event{" +
                "title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", eventDateTime=" + date +
                ", location='" + location + '\'' +
                '}';
    }
}
