package com.roman.app.context;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class ServiceContext {
    
    private final ApplicationContext context = new ClassPathXmlApplicationContext("service-context.xml");
    
    private final static ServiceContext instance = new ServiceContext();
    
    private ServiceContext() {}
    
    public static ServiceContext getInstance() {
        return instance;
    }
    
    public <T> T getService(Class<T> type) {
        if (!type.isInterface()) { throw new RuntimeException(type.getName() + " is not interface"); }
        return context.getBean(type);
    }
    
}
