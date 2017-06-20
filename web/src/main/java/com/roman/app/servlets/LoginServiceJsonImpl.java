package com.roman.app.servlets;

import javax.servlet.annotation.WebServlet;

import com.roman.app.context.ServiceContext;
import com.roman.app.json.AbstractJsonRpcServer;
import com.roman.app.user.LoginService;

@WebServlet("/login.json")
public class LoginServiceJsonImpl extends AbstractJsonRpcServer implements LoginService {
    
    private final static long serialVersionUID = 1L;
    
    public LoginServiceJsonImpl() {
        super(LoginService.class, false);
    }
    
    @Override
    public String loginUser(String username, String password) {
        return ServiceContext.getInstance().getService(LoginService.class).loginUser(username, password);
    }
}
