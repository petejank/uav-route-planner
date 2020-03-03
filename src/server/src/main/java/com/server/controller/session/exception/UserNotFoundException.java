package com.server.controller.session.exception;

import com.server.util.ExceptionMessage;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class UserNotFoundException extends Exception {
    private static final String MESSAGE = "User not found: ";

    public UserNotFoundException(String route, String username) {
        super(ExceptionMessage.format(route, MESSAGE + username));
    }
}
