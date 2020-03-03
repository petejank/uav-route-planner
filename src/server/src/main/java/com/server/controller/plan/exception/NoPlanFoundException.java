package com.server.controller.plan.exception;

import com.server.util.ExceptionMessage;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class NoPlanFoundException extends Exception {
    private static final String MESSAGE = "No plan found: ";

    public NoPlanFoundException(String route, String planId) {
        super(ExceptionMessage.format(route, MESSAGE + planId));
    }
}
