package com.server.repository;

import com.server.entity.Point;
import org.springframework.data.repository.CrudRepository;

public interface PointRepository extends CrudRepository<Point, String> {

}
