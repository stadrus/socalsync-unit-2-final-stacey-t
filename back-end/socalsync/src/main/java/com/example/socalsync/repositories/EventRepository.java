package com.example.socalsync.repositories;

import com.example.socalsync.models.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EventRepository extends JpaRepository <Event, Integer>{
    List<Event> findByUserId(int userId);
}
