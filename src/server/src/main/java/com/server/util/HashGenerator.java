package com.server.util;

import org.apache.commons.codec.digest.DigestUtils;

public class HashGenerator {
    public static String sha256(String password, String salt) {
        return DigestUtils.sha256Hex(password + salt);
    }

    public static String random() {
        return DigestUtils.sha256Hex(Double.toString(Math.random()));
    }
}
