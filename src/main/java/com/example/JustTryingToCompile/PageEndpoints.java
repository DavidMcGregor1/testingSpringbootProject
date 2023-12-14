package com.example.JustTryingToCompile;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.ui.Model;


import java.util.*;

@Controller
public class PageEndpoints {

    public PageEndpoints() {

    }

    @GetMapping(path = "/settingsPage")
    public String settingsPage() {
        return "settingsPage";
    }

    @GetMapping(path = "/leaderboardsPage")
    public String leaderboardsPage() {
        return "leaderboardsPage";
    }

    @GetMapping(path = "/statsPage")
    public String statsPage() {
        return "statsPage";
    }

    @GetMapping(path = "/quiz")
    public String quiz() {
        return "quizQuestionPage";
    }

    @GetMapping(path = "/quizMenu")
    public String quizMenu() {
        return "quizMenu";
    }

    @GetMapping(path = "/homePage")
    public String homePage() {return "homePage";}
    @GetMapping(path = "/login")
    public String displaySignInPage() {
        return "loginPage";
    }
}