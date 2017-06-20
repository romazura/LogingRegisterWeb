package com.roman.app.servlets;

import javax.servlet.annotation.WebServlet;

import com.roman.app.context.ServiceContext;
import com.roman.app.datamodel.User;
import com.roman.app.json.AbstractJsonRpcServer;
import com.roman.app.user.RegistrationService;

@WebServlet("/registration.json")
public class RegistrationServiceJsonImpl extends AbstractJsonRpcServer implements RegistrationService {
    
    private final static long serialVersionUID = 1L;
    
    public RegistrationServiceJsonImpl() {
        super(RegistrationService.class, false);
    }
    
    @Override
    public void registerUser(User user) {
        ServiceContext.getInstance().getService(RegistrationService.class).registerUser(user);
    }
}
