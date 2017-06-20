package com.roman.app.user;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.roman.app.datamodel.DataStore;
import com.roman.app.datamodel.User;
import com.roman.app.security.token.AuthToken;
import com.roman.app.util.ValidationUtil;

public class LoginServiceImpl implements LoginService {
    
    private static final Logger logger = LoggerFactory.getLogger(LoginServiceImpl.class);

    
    @Override
    public String loginUser(String username, String password) {
        User user = DataStore.getInstance().findByUsername(username);
        if (user != null) {
            ValidationUtil.matchPasswords(password, user.getPassword());
            logger.info("loginUser: user: '" + username + "' logged in.");
            return AuthToken.generateToken(user);
        } else {
            throw new RuntimeException("loginUser: Username don't exist.");
            
        }
    }
}
