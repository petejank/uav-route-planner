package com.server.repository;

import com.server.entity.Plan;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface PlanRepository extends CrudRepository<Plan, String> {
    @Query("SELECT DISTINCT p FROM Plan p LEFT JOIN FETCH p.points po ORDER BY p.createdAt DESC, po.createdAt DESC")
    List<Plan> findAllOrderByCreatedAt();
}
