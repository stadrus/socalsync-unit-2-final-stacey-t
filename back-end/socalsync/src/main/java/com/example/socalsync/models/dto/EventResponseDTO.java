package com.example.socalsync.models.dto;

import com.example.socalsync.models.Event;

import java.time.LocalDate;


public class EventResponseDTO {
    private int eventId;
    private String title;
    private String description;
    private LocalDate date;
    private String location;

    private int userId;

    public EventResponseDTO() {
    }

    public EventResponseDTO(Event event) {
        this.eventId = event.getEventId();
        this.title = event.getTitle();
        this.description = event.getDescription();
        this.date = event.getDate();
        this.location = event.getLocation();
    }



    public EventResponseDTO(int eventId, int userId) {
        this.eventId = eventId;
        this.userId = userId;
    }

    public void setEventId(int eventId) {this.eventId = eventId;}
    public int getEventId() {return eventId;}

    public String getTitle() {return title;}
    public void setTitle(String title) {this.title = title;}

    public String getDescription() {return description;}
    public void setDescription(String description) {this.description = description;}

    public LocalDate getDate() {return date;}
    public void setDate(LocalDate date) {this.date = date;}

    public String getLocation() {return location;}
    public void setLocation(String location) {this.location = location;}

    public void setUserId(int userId) { this.userId = userId;}
    public int getUserId(){
        return userId;
    }
}
