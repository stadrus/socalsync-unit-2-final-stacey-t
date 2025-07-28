package com.example.socalsync.repositories;

import com.example.socalsync.service.CometChatService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatRepository extends JpaRepository<CometChatService, Integer> {
}
