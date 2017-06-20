package com.roman.app.servlets;

import java.util.Collection;

import javax.servlet.annotation.WebServlet;

import com.roman.app.context.ServiceContext;
import com.roman.app.datamodel.User;
import com.roman.app.json.AbstractJsonRpcServer;
import com.roman.app.user.UserService;

@WebServlet("/userservice.json")
public class UserServiceJsonImpl extends AbstractJsonRpcServer implements UserService {
    
    private final static long serialVersionUID = 1L;
    
    public UserServiceJsonImpl() {
        super(UserService.class, true);
    }
    
    public User getMyProfile() {
        return ServiceContext.getInstance().getService(UserService.class).getMyProfile();
    }
    
    public void editMyProfile(User user) {
        ServiceContext.getInstance().getService(UserService.class).editMyProfile(user);
    }
    
    @Override
    public User findById(Integer id) {
        return ServiceContext.getInstance().getService(UserService.class).findById(id);
    }
    
    @Override
    public User findByUserName(String username) {
        return ServiceContext.getInstance().getService(UserService.class).findByUserName(username);
    }
    
    @Override
    public Collection<User> findAll() {
        return ServiceContext.getInstance().getService(UserService.class).findAll();
    }
    
    @Override
    public void deleteUser(Integer id) {
        ServiceContext.getInstance().getService(UserService.class).deleteUser(id);
    }
    
    @Override
    public void updateUser(User user) {
        ServiceContext.getInstance().getService(UserService.class).updateUser(user);
    }
    
    @Override
    public void changePassword(String oldPassword, String newPassword, String confirmPassword) {
        ServiceContext.getInstance().getService(UserService.class).changePassword(oldPassword, newPassword, confirmPassword);
    }
}
