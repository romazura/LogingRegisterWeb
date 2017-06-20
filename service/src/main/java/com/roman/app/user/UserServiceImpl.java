package com.roman.app.user;

import java.util.Collection;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.roman.app.datamodel.DataStore;
import com.roman.app.datamodel.User;
import com.roman.app.util.ValidationUtil;
import com.roman.app.json.AbstractJsonRpcServer;

public class UserServiceImpl implements UserService {
    
    private static final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);
    
    @Override
    public User getMyProfile() {
        return DataStore.getInstance().findById(AbstractJsonRpcServer.getUserId());
    }
    
    @Override
    public void editMyProfile(User user) {
        user.setId(AbstractJsonRpcServer.getUserId());
        ValidationUtil.validateUsername(user.getUsername());
        ValidationUtil.validateFirstName(user.getFirstName());
        ValidationUtil.validateLastName(user.getLastName());
        DataStore.getInstance().updateUser(user);
        logger.info("editMyProfile: User updated: " + user);
    }
    
    @Override
    public User findById(Integer id) {
        return DataStore.getInstance().findById(id);
    }
    
    @Override
    public User findByUserName(String username) {
        ValidationUtil.validateUsername(username);
        return DataStore.getInstance().findByUsername(username);
    }
    
    @Override
    public Collection<User> findAll() {
        return DataStore.getInstance().findAll();
    }
    
    @Override
    public void deleteUser(Integer id) {
        DataStore.getInstance().deleteUser(id);
        logger.info("deleteUser: User deleted, userid: " + id);
    }
    
    @Override
    public void updateUser(User user) {
        ValidationUtil.validateUsername(user.getUsername());
        ValidationUtil.validatePassword(user.getPassword());
        ValidationUtil.validateFirstName(user.getFirstName());
        ValidationUtil.validateLastName(user.getLastName());
        DataStore.getInstance().updateUser(user);
        logger.info("updateUser: User updated: " + user);
    }
    
    @Override
    public void changePassword(String oldPassword, String newPassword, String confirmPassword) {
        ValidationUtil.validateNewPassword(AbstractJsonRpcServer.getUserId(), oldPassword, newPassword, confirmPassword);
        DataStore.getInstance().changePassword(AbstractJsonRpcServer.getUserId(), newPassword);
        logger.info("changePassword: Password changed for userid: " + AbstractJsonRpcServer.getUserId());
    }
}
