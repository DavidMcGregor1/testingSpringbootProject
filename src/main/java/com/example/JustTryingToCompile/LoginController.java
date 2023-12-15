package com.example.JustTryingToCompile;

import org.apache.catalina.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.ui.Model;


import java.util.*;

@Controller
public class LoginController {

    public LoginController(UsersRepository u) {
        repositoryUsers = u;
    }

    private UsersRepository repositoryUsers;

    @PostMapping(path = "/validateLogin")
    public String validateLogin(@RequestBody UsersVm userToValidate) {
        System.out.println("Hit ValidateLogin api");
        List<Users> allUsersInDB = repositoryUsers.findAll();
        System.out.println("User to validate:" + userToValidate);
        System.out.println(userToValidate.username);
        System.out.println(userToValidate.password);
        boolean isMatch = false;
        String result = "";
        for (Users u : allUsersInDB) {
            if (userToValidate.username.equals(u.getUsername()) && userToValidate.password.equals(u.getPassword())) {
                isMatch = true;
                System.out.println("FOUND A MATCH");

            } else if (!userToValidate.username.equals(u.getUsername()) && userToValidate.password.equals(u.getPassword())) {
                isMatch = false;
                System.out.println("Could not find a match");
            }
        }

        if (isMatch == false) {
            System.out.println("inside isMatch = false statement");
            throw new AccessDeniedExeption();
        }

        System.out.println("What is being returned at the end of the function --> " + result);
        return "learnPage";
    }

//    @PostMapping(path = "/addUserFromSignup")
//    public String addUserFromSignup(@RequestBody UsersVm incomingUser) {
//        System.out.println("hit addUserFromSignup");
//        List<Users> allUsersInDB = repositoryUsers.findAll();
//        System.out.println("Incoming user" + incomingUser);
//        return incomingUser.password;
//    }

    @GetMapping(path = "/testtt")
    public String test() {
        return "TEST";
    }

    @PostMapping(path = "/addUserFromSignup")
    public ResponseEntity<String> addUserFromSignup(@RequestBody UsersVm incomingUser) {
        System.out.println("hit addUserFromSignup");
        List<Users> allUsersInDB = repositoryUsers.findAll();
        System.out.println("Incoming user" + incomingUser);

        // Process the user data and construct the response string
        String responseMessage = "Username --> " + incomingUser.username;

        // Return the response string
        return ResponseEntity.ok(responseMessage);
    }



}