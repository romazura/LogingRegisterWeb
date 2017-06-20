package com.roman.app.user;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.roman.app.datamodel.DataStore;
import com.roman.app.datamodel.User;
import com.roman.app.util.ValidationUtil;

public class RegistrationServiceImpl implements RegistrationService {
    
    private static final Logger logger = LoggerFactory.getLogger(RegistrationServiceImpl.class);

    
    @Override
    public void registerUser(User user) {
        if (DataStore.getInstance().findByUsername(user.getUsername()) == null) {
            user.setId(null);
            ValidationUtil.validateUsername(user.getUsername());
            ValidationUtil.validatePassword(user.getPassword());
            ValidationUtil.validateFirstName(user.getFirstName());
            ValidationUtil.validateLastName(user.getLastName());
            DataStore.getInstance().updateUser(user);
            logger.info("registerUser: created user: " + user);
        } else {
            throw new RuntimeException("registerUser: Username already in use.");
        }
    }
}
