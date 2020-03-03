package com.server.model;

import com.server.entity.Token;
import com.server.util.HashGenerator;

public class TokenModel {
    public static Token create() {
        Token token = new Token();
        token.setToken(HashGenerator.random());

        return token;
    }
}
