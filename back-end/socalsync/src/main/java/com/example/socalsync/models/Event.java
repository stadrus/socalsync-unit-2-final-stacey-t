package com.example.socalsync.models;



import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int eventId;
    private String title;
    private String description;
    private LocalDateTime eventDateTime;
    private String location;


    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;


    //constructor
    public Event() {
    }

    public Event(int eventId) {
        this.eventId = eventId;
    }

    public Event(String location, LocalDateTime eventDateTime, String description, String title) {

        this.location = location;
        this.eventDateTime = eventDateTime;
        this.description = description;
        this.title = title;
    }
    //getters and setters
    public int getEventId() {return eventId;}

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
