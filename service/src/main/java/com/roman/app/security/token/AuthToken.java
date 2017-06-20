package com.roman.app.security.token;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.roman.app.datamodel.User;

public class AuthToken {
    
    private static final Logger logger = LoggerFactory.getLogger(AuthToken.class);
    
    private static final String TOKEN_DELIM = ":";
    
    private AuthToken() {}
    
    public static String generateToken(User user) {
        return user.getId() + TOKEN_DELIM + user.getUsername();
    }
    
    public static void verifyToken(String token) {
        if (token != null && !token.isEmpty()) {
            final int id = getUserId(token);
            final String username = getUsername(token);
            
            if (id < 1) {
                logger.debug("verifyToken: invalid userId: " + id);
                throw new RuntimeException("verifyToken: invalid userId.");
            }
            
            if (username.isEmpty()) {
                logger.debug("verifyToken: username is empty: " + username);
                throw new RuntimeException("verifyToken: username is empty.");
            }
        } else {
            throw new RuntimeException("verifyToken: invalid/empty token.");
        }
    }
    
    public static int getUserId(String token) {
        try {
            return Integer.parseInt(token.substring(0, token.indexOf(TOKEN_DELIM)));
        } catch (Exception e) {
            logger.debug("getUserId: can't get UserId from token: " + token + ": " + e);
            throw new RuntimeException(e);
        }
    }
    
    private static String getUsername(String token) {
        try {
            return token.substring(token.indexOf(TOKEN_DELIM));
        } catch (Exception e) {
            logger.debug("getUsername: can't get username from token: " + token + ": " + e);
            throw new RuntimeException(e);
        }
    }
}
