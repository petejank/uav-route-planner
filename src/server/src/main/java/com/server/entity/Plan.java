package com.server.entity;

import com.server.entity.util.GeneratorType;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(indexes = { @Index(name = "PLAN_CREATED_AT", columnList = "createdAt") })
public class Plan {
    @Id
    @GeneratedValue(generator = GeneratorType.UUID)
    @GenericGenerator(name = GeneratorType.UUID, strategy = GeneratorType.UUID_STRATEGY)
    @Column(length = 36)
    private String id;

    @Column(nullable = false)
    private String color;

    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    @Column(nullable = false)
    private Date createdAt;

    @OneToMany(mappedBy = "plan", cascade = CascadeType.ALL)
    private List<Point> points;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public List<Point> getPoints() {
        if (points == null) return new ArrayList<Point>();
        return points;
    }

    public void setPoints(List<Point> points) {
        this.points = points;
    }
}
