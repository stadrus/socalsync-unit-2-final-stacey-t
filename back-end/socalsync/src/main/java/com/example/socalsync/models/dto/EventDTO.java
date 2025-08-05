package com.example.socalsync.models.dto;

import java.time.LocalDate;
import java.util.Date;


public class EventDTO {
    private String title;
    private String description;
    private LocalDate date;
    private String location;


    public EventDTO() {
    }

    public EventDTO(String title, String description, LocalDate date, String location) {
        this.title = title;
        this.description = description;
        this.date = date;
        this.location = location;
    }

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

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }
}
