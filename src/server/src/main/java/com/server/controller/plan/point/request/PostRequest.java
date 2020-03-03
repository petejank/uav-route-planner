package com.server.controller.plan.point.request;

import javax.validation.constraints.NotNull;

public class PostRequest {
    @NotNull
    public double lat;

    @NotNull
    public double lng;
}
