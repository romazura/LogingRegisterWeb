package com.roman.app.user;

import java.util.Collection;

import com.roman.app.datamodel.User;

public interface UserService {
    
    User findById(Integer id);
    
    User getMyProfile();
    
    User findByUserName(String username);
    
    Collection<User> findAll();
    
    void deleteUser(Integer id);
    
    void updateUser(User user);
    
    void changePassword(String oldPassword, String newPassword, String confirmPassword);

    void editMyProfile(User user);
}
