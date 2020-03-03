package com.server.model;

import com.server.entity.Token;
import com.server.entity.User;
import com.server.model.payload.SessionPayload;

public class SessionModel {
    public static SessionPayload createPayload(User user, Token token) {
        return new SessionPayload(user.getUsername(), token.getToken());
    }
}
