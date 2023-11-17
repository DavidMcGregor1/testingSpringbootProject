package com.example.JustTryingToCompile;


import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.ui.Model;


import java.util.*;

@Controller
public class HelloWorldController {

    public HelloWorldController(CustomerRepository c,AcronymsRepository a) {
        repositoryCustomer = c;
        repositoryAcronyms = a;
    }

    private CustomerRepository repositoryCustomer;
    private AcronymsRepository repositoryAcronyms;

    @GetMapping(path = "/")
    public String defualt() {
        return "home";
    }


    @GetMapping(path = "/displayNewAcronyms")
    public String displayNewAcronyms(Model model) {

        System.out.println("Hit displayAcronyms API");

        List<Acronyms> allAcronyms = repositoryAcronyms.findAll();
        System.out.println("All data" + allAcronyms);

        model.addAttribute("acronyms", allAcronyms);

        String result = "Data ---> ";

        for (int i = 0; i < allAcronyms.stream().count(); i++) {
            Acronyms a = allAcronyms.get(i);
            System.out.println(i);
            System.out.println(a);
            System.out.println(a.acronym);
            if (a != null) {
                result = result + a.getAcronym() + a.getMeaning() + a.getDescription() + ", "
                ;            }
        }
        return "newDisplayAcronyms";
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
