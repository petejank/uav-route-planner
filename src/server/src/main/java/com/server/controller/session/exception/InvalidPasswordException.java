package com.server.controller.session.exception;

import com.server.util.ExceptionMessage;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.FORBIDDEN)
public class InvalidPasswordException extends Exception {
    private static final String MESSAGE = "Incorrect password for user: ";

    public InvalidPasswordException(String route, String username) {
        super(ExceptionMessage.format(route, MESSAGE + username));
    }
}
