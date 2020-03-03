package com.server.util;

public class ExceptionMessage {
    private static final String SEPARATOR = " -- ";

    public static String format(String prefix, String message) {
        return prefix + SEPARATOR + message;
    }
}
