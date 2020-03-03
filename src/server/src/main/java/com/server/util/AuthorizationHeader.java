package com.server.util;

import javax.servlet.http.HttpServletRequest;

public class AuthorizationHeader {
    private static final String AUTHORIZATION_HEADER = "Authorization";

    public static String get(HttpServletRequest httpRequest) {
        return httpRequest.getHeader(AUTHORIZATION_HEADER);
    }
}
