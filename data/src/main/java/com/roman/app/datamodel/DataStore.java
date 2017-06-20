package com.roman.app.datamodel;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Map;
import java.util.TreeMap;

import com.github.javafaker.Faker;

public class DataStore {
    //fake users generator.
    private Faker faker = new Faker();
    
    private Map<Integer, User> users = new TreeMap<Integer, User>();
    
    private final static DataStore instance = new DataStore();
    
    private DataStore() {
        init();
    }
    
    public static DataStore getInstance() {
        return instance;
    }
    
    private void init() {
        users.put(13, new User(13, "test", "test", "Roman", "Zuravkov"));
        for (int i = 1; i <= 10; i++) {
            // 10 fake users
            User user = new User(i, faker.name().username(), faker.name().username(), faker.name().firstName(), faker.name().lastName());
            users.put(i, user);
        }
    }
    
    public User findById(Integer id) {
        return users.get(id);
    }
    
    public User findByUsername(String username) {
        for (User user : users.values()) {
            if (user.getUsername().equals(username)) { return user; }
        }
        return null;
    }
    
    public Collection<User> findAll() {
        return users.values();
    }
    
    public void deleteUser(Integer id) {
        users.remove(id);
    }
    
    public void updateUser(User user) {
        //if without id => creates new
        if (user.getId() == null) {
            if (findByUsername(user.getUsername()) != null) { throw new RuntimeException("updateUser: Such username already exist."); }
            user.setId(findMaxId() + 1);
        }
        users.put(user.getId(), user);
    }
    
    public void changePassword(Integer id, String newPassword) {
        User user = findById(id);
        user.setPassword(newPassword);
        users.put(id, user);
    }
    
    private Integer findMaxId() {
        if (users.isEmpty()) { return 0; }
        return new ArrayList<Integer>(users.keySet()).get(users.size() - 1);
    }
    
}
