package com.example.JustTryingToCompile;


import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.xml.xpath.XPath;
import java.util.List;

@Controller
public class QuizController {

    public QuizController(AcronymsRepository a, CategoriesRepository c) {
        repositoryAcronyms = a;
        repositoryCategories = c;
    }

    private AcronymsRepository repositoryAcronyms;
    private CategoriesRepository repositoryCategories;

    @GetMapping(path = "/quiz")
    public String quiz() {
        return "quizQuestionPage";
    }

    @GetMapping(path = "/quizMenu")
    public String quizMenu() {
        return "quizMenuPage";
    }

    @GetMapping(path = "/displayQuestion")
    public List<Acronyms> displayQuestion(@RequestParam String category, Model model ) {
        System.out.println("hit /displayQuestion");
        System.out.println(category);
        
        List<Acronyms> acronymsToTurnIntoQuestions = null;

        if (category.equals("tech")) {
            System.out.println("category is tech");
            acronymsToTurnIntoQuestions = repositoryAcronyms.findByCategoryIgnoreCase(category);
        } else if (category.equals("business")) {
            System.out.println("category is business");
            acronymsToTurnIntoQuestions = repositoryAcronyms.findByCategoryIgnoreCase(category);
        }
        

        List<Acronyms> allAcronymsWithCategory = repositoryAcronyms.findByCategoryIgnoreCase(category);
        System.out.println(allAcronymsWithCategory);
        for (Acronyms acronym : allAcronymsWithCategory) {
            System.out.println(acronym.getAcronym());
        }
        return acronymsToTurnIntoQuestions;
    }

}
