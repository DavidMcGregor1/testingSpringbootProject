package com.example.JustTryingToCompile;


import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.ui.Model;


import java.util.*;

@Controller
public class HelloWorldController {

    public HelloWorldController(AcronymsRepository a) {
        repositoryAcronyms = a;
    }

    private AcronymsRepository repositoryAcronyms;

    @GetMapping(path = "/")
    public String defualt() {
        return "home";
    }


    @GetMapping(path = "/displayNewAcronyms")
    public String displayNewAcronyms(@RequestParam(name = "category", required = false) String category, Model model) {

        System.out.println("Hit displayAcronyms API");

        List<Acronyms> allAcronyms = repositoryAcronyms.findAll();



        model.addAttribute("acronyms", allAcronyms);

        return "newDisplayAcronyms";
    }



    @GetMapping(path = "/acronymsByCategory")
    @ResponseBody
    public List<Acronyms> getAcronymsByCategory(@RequestParam(name = "category") String category) {
        System.out.println("Hit acronymsByCategory API");

        // Perform a case-insensitive search by category
        List<Acronyms> acronyms = repositoryAcronyms.findByCategoryIgnoreCase(category);

        return acronyms;
    }

    @GetMapping(path = "/acronymsByLength")
    @ResponseBody
    public List<Acronyms> getAcronymsByLength(@RequestParam(name = "length") int length) {
        System.out.println("Hit acronymsByLength API");

        // Perform a case-insensitive search by category
        List<Acronyms> acronyms = repositoryAcronyms.findByLength(length);

        return acronyms;
    }

    @GetMapping(path = "/acronymsByCategoryAndLength")
    @ResponseBody
    public List<Acronyms> getAcronymsByCategoryAndLength(
            @RequestParam(name = "category") String category,
            @RequestParam(name = "length") int length) {
        System.out.println("Hit acronymsByCategoryAndLength API");

        List<Acronyms> acronyms;

        if(length == -1) {
            if(category.equals("all")) {
                //get everything
                acronyms = repositoryAcronyms.findAll();
            } else {
                //length is -1 and category is specified - get by category
                acronyms = repositoryAcronyms.findByCategoryIgnoreCase(category);

            }
        } else {
            if(category.equals("all")) {
                // get by length and ignore category
                acronyms = repositoryAcronyms.findByLength(length);
            } else {
                //get by length and category
                acronyms = repositoryAcronyms.findByCategoryIgnoreCaseAndLength(category, length);
            }
        }



        return acronyms;
    }



    @ResponseStatus(value = HttpStatus.OK)
    @ResponseBody
    @PostMapping(path = "/getAcronymById", consumes="application/json", produces = "application/json")
    public AcronymsVm getAcronymById(@RequestBody AcronymsVm submittedId) {
        System.out.println("hit get acornym by id api");
        System.out.println("submitted id " + submittedId);

        Optional<Acronyms> acronymId = repositoryAcronyms.findById(submittedId.id);

        AcronymsVm result = new AcronymsVm();
        result.acronyms = acronymId.get().getAcronym();
        result.meaning = acronymId.get().getMeaning();
        result.category = acronymId.get().getCategory();
        result.id = acronymId.get().getId();
        result.description = acronymId.get().description;

        return result;
    }

    @ResponseStatus(value = HttpStatus.OK)
    @ResponseBody
    @PostMapping(path = "/getAcronymMeaningAndDescriptionById")
    public AcronymsVm getAcronymMeaningAndDescriptionById(@RequestBody AcronymsVm submittedId) {
        System.out.println("hit getAcronymMeaningAndDescriptionById API");

        Optional<Acronyms> acronymId = repositoryAcronyms.findById(submittedId.id);

        AcronymsVm result = new AcronymsVm();
        result.acronyms = acronymId.get().getAcronym();
        result.meaning = acronymId.get().getMeaning();
        result.description = acronymId.get().getDescription();

        return result;
    }




    @GetMapping(path = "/getAllAcronyms")
    @ResponseBody
    public String getAllAcronyms() {
        System.out.println("Hit getAllAcronyms API");

        List<Acronyms> allAcronyms = repositoryAcronyms.findAll();
        String result = "Data ---> ";

        for (int i = 0; i < allAcronyms.stream().count(); i++) {
            Acronyms a = allAcronyms.get(i);
            if (a != null) {
                result = result + a.getAcronym() + a.getMeaning() + a.getDescription() + ", "
                ;            }
        }
        return result;
    }



}
