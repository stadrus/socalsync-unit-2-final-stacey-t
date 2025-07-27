package com.example.socalsync.repositories;

import com.example.socalsync.models.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EventRepository extends JpaRepository <Event, Integer>{
}
