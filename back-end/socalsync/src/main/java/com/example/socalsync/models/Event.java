package com.example.socalsync.models;

import jakarta.persistence.*;

@Entity
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    //columns for table
    @Column(name = "title")
    private String title;
    @Column(name = "description")
    private String description;
    @Column (name = "date")
    private int date;
    @Column (name = "time")
    private int time;

    //constructor
    public Event() {
    }

    public Event(int id) {
        this.id = id;
    }

    public Event(String title, String description, int date, int time) {
        this.title = title;
        this.description = description;
        this.date = date;
        this.time = time;
    }

    //getters and setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
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

    public int getDate() {
        return date;
    }

    public void setDate(int date) {
        this.date = date;
    }

    public int getTime() {
        return time;
    }

    public void setTime(int time) {
        this.time = time;
    }

    @Override
    public String toString() {
        return "Event{" +
                "title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", date=" + date +
                ", time=" + time +
                '}';
    }
}
