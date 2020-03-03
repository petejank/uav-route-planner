package com.server.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.server.entity.util.GeneratorType;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@Entity
@Table(indexes = { @Index(name = "TOKEN_TOKEN", columnList = "token") })
@JsonIgnoreProperties("user")
public class Token {
    @Id
    @GeneratedValue(generator = GeneratorType.UUID)
    @GenericGenerator(name = GeneratorType.UUID, strategy = GeneratorType.UUID_STRATEGY)
    @Column(length = 36)
    private String id;

    @Column(nullable = false)
    private String token;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
