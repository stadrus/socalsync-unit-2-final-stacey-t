package com.example.socalsync.models.dto;

import java.time.LocalDateTime;

public class EventResponseDTO {
    private int eventId;
    private String title;
    private String description;
    private LocalDateTime eventDateTime;
    private String location;

    public EventResponseDTO() {
    }

    public EventResponseDTO(int eventId, String title, String description, LocalDateTime eventDateTime, String location) {
        this.eventId = eventId;
        this.title = title;
        this.description = description;
        this.eventDateTime = eventDateTime;
        this.location = location;
    }

    public void setEventId(int eventId) {}
    public int getEventId() {return eventId;}

    public String getTitle() {return title;}
    public void setTitle(String title) {this.title = title;}

    public String getDescription() {return description;}
    public void setDescription(String description) {this.description = description;}

    public LocalDateTime getEventDateTime() {return eventDateTime;}
    public void setEventDateTime(LocalDateTime eventDateTime) {this.eventDateTime = eventDateTime;}

    public String getLocation() {return location;}
    public void setLocation(String location) {this.location = location;}


}
