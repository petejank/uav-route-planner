package com.server.util;

public class TokenString {
    public static String extract(String authorizationHeader) {
        String[] tokenParts = authorizationHeader.split(" ");
        return tokenParts.length > 1 ? tokenParts[1] : "";
    }
}
