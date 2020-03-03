package com.server.repository;

import com.server.entity.Token;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface TokenRepository extends CrudRepository<Token, String> {
    @Query("SELECT t FROM Token t JOIN FETCH t.user WHERE t.token = ?1")
    Optional<Token> findByToken(String token);
}
