package com.server.controller.session.request;

import javax.validation.constraints.NotEmpty;

public class PostRequest {
    @NotEmpty
    public String username;

    @NotEmpty
    public String password;
}
