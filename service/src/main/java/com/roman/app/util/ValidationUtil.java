package com.roman.app.util;

import com.roman.app.datamodel.DataStore;
import com.roman.app.datamodel.User;

public class ValidationUtil {
    
    private ValidationUtil() {}
    
    public static void validateUsername(String username) {
        if (isEmpty(username)) { throw new RuntimeException("validateUsername: Username is mandatory."); }
    }
    
    public static void validateFirstName(String firstName) {
        if (isEmpty(firstName)) { throw new RuntimeException("validateFirstName: First name is mandatory."); }
    }
    
    public static void validateLastName(String lastName) {
        if (isEmpty(lastName)) { throw new RuntimeException("validateLastName: Last name is mandatory."); }
    }
    
    public static void validatePassword(String password) {
        if (isEmpty(password)) { throw new RuntimeException("validatePassword: Password is mandatory."); }
    }
    
    public static void matchPasswords(String loginPassword, String existingPassword) {
        validatePassword(loginPassword);
        if (!loginPassword.equals(existingPassword)) { throw new RuntimeException("matchPasswords: Password not corrent."); }
    }
    
    public static void validateNewPassword(Integer id, String oldPassword, String newPassword, String confirmPassword) {
        if (isEmpty(oldPassword)) { throw new RuntimeException("validateNewPassword: Old Password is mandatory."); }
        if (isEmpty(newPassword)) { throw new RuntimeException("validateNewPassword: New Password is mandatory."); }
        if (isEmpty(confirmPassword)) { throw new RuntimeException("validateNewPassword: Confirm Password is mandatory."); }
        User currentUser = DataStore.getInstance().findById(id);
        if (!currentUser.getPassword().equals(oldPassword)) { throw new RuntimeException("validateNewPassword: Password incorrect."); }
        if (currentUser.getPassword().equals(newPassword)) { throw new RuntimeException("validateNewPassword: New password equals with old."); }
        if (!newPassword.equals(confirmPassword)) { throw new RuntimeException("validateNewPassword: Confirmation password doesn't match."); }
    }
    
    private static boolean isEmpty(String string) {
        return (string == null || string.isEmpty());
    }
}
