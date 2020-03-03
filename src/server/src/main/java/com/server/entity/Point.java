package com.server.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.server.entity.util.GeneratorType;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(indexes = { @Index(name = "POINT_CREATED_AT", columnList = "createdAt") })
@JsonIgnoreProperties("plan")
public class Point {
    @Id
    @GeneratedValue(generator = GeneratorType.UUID)
    @GenericGenerator(name = GeneratorType.UUID, strategy = GeneratorType.UUID_STRATEGY)
    @Column(length = 36)
    private String id;

    @Column(nullable = false)
    private Double lat;

    @Column(nullable = false)
    private Double lng;

    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    @Column(nullable = false)
    private Date createdAt;

    @ManyToOne
    @JoinColumn(name = "plan_id")
    private Plan plan;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Double getLat() {
        return lat;
    }

    public void setLat(Double lat) {
        this.lat = lat;
    }

    public Double getLng() {
        return lng;
    }

    public void setLng(Double lng) {
        this.lng = lng;
    }

    public Plan getPlan() {
        return plan;
    }

    public void setPlan(Plan plan) {
        this.plan = plan;
    }
}
