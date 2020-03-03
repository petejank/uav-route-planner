package com.server.model;

import com.server.entity.Point;

public class PointModel {
    public static Point create(double lat, double lng) {
        Point point = new Point();
        point.setLat(lat);
        point.setLng(lng);

        return point;
    }
}
