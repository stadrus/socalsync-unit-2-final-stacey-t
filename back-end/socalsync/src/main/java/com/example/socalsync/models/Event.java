package com.example.socalsync.models;


import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int event_id;
    private String title;
    private String description;
    private LocalDateTime eventDateTime;
    private String location;


    @ManyToOne
    @JoinColumn(name = "user_Id")
    private User user;


    //constructor
    public Event() {
    }

    public Event(int event_id) {
        this.event_id = event_id;
    }

    public Event(User user, String location, LocalDateTime eventDateTime, String description, String title) {
        this.user = user;
        this.location = location;
        this.eventDateTime = eventDateTime;
        this.description = description;
        this.title = title;
    }
    //getters and setters


    public int getEvent_id() {return event_id;}

    public void setEvent_id(int event_id) {this.event_id = event_id;}

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

    public LocalDateTime getEventDateTime() {return eventDateTime;}

    public void setEventDateTime(LocalDateTime eventDateTime) {this.eventDateTime = eventDateTime;}

    public String getLocation() {return location;}

    public void setLocation(String location) {this.location = location;}

    @Override
    public String toString() {
        return "Event{" +
                "title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", eventDateTime=" + eventDateTime +
                ", location='" + location + '\'' +
                '}';
    }
}
