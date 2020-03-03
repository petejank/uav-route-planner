package com.server.model;

import com.server.entity.User;
import com.server.util.HashGenerator;

public class UserModel {
    public static User create(String username, String password) {
        User user = new User();
        String salt = HashGenerator.random();

        user.setUsername(username);
        user.setPassword(HashGenerator.sha256(password, salt));
        user.setSalt(salt);

        return user;
    }
}
