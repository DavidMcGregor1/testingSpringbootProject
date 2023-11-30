package com.example.JustTryingToCompile;


import org.apache.catalina.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.ui.Model;


import java.util.*;

@Controller
public class HelloWorldController {

    public HelloWorldController(AcronymsRepository a, CategoriesRepository c, UsersRepository u) {
        repositoryAcronyms = a;
        repositoryCategories = c;
        repositoryUsers = u;
    }

    private AcronymsRepository repositoryAcronyms;
    private CategoriesRepository repositoryCategories;
    private UsersRepository repositoryUsers;

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

    @ResponseStatus(value = HttpStatus.OK)
    @ResponseBody
    @PutMapping(path = "/updateAcronymDescription", consumes = "application/json", produces = "application/json")
    public ResponseEntity<String> updateAcronymDescription(@RequestBody UpdateDescriptionRequest request) {
        try {
            int acronymId = request.getId();
            String newDescription = request.getNewDescription();

            Optional<Acronyms> optionalAcronym = repositoryAcronyms.findById(acronymId);
            if (optionalAcronym.isPresent()) {
                Acronyms acronym = optionalAcronym.get();

                acronym.setDescription((newDescription));
                repositoryAcronyms.save(acronym);
                return new ResponseEntity<>("Description updated successfully", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Acronym not found", HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>("Error updating description: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
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
    @PostMapping(path ="/getCategoryById", consumes = "application/json", produces = "application/json")
    public CategoriesVm getCategoryById (@RequestBody CategoriesVm submittedId) {
        System.out.println("Hit get category by id");

        Optional<Categories>  categoryId = repositoryCategories.findById(submittedId.id);
        CategoriesVm result = new CategoriesVm();
        result.id = categoryId.get().getId();
        System.out.println(result);
        result.category = categoryId.get().getCategory();
        System.out.println(result);

        return result;
    }


    @ResponseStatus(value = HttpStatus.OK)
    @ResponseBody
    @PostMapping(path = "/getAcronymById", consumes="application/json", produces = "application/json")
    public AcronymsVm getAcronymById(@RequestBody AcronymsVm submittedId) {
        System.out.println("hit get acornym by id api");
        System.out.println("submitted id " + submittedId);

        Optional<Acronyms> acronymId = repositoryAcronyms.findById(submittedId.id);

        AcronymsVm result = new AcronymsVm();
        result.acronym = acronymId.get().getAcronym();
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
        result.acronym = acronymId.get().getAcronym();
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

    @PostMapping(path = "/addAcronym")
    @ResponseBody
    public AcronymsVm addAcronym(@RequestBody AcronymsVm submittedAcronym) {
        System.out.println("Hit addAcronym API");
        Acronyms newAcronym = new Acronyms();
        newAcronym.setAcronym(submittedAcronym.acronym);
        newAcronym.setMeaning(submittedAcronym.meaning);
        newAcronym.setCategory(submittedAcronym.category);
        newAcronym.setLength(submittedAcronym.length);
        newAcronym.setDescription(submittedAcronym.description);

        repositoryAcronyms.save(newAcronym);

        return submittedAcronym;
    }
    @PostMapping(path = "/addUser")
    @ResponseBody
    public Users addUser(@RequestBody UsersVm submittedUser) {
        System.out.println("Hit addUsers API");
        Users newUser = new Users();
        newUser.setUsername(submittedUser.username);
        newUser.setPassword(submittedUser.password);
        repositoryUsers.save(newUser);

        return newUser;
    }

    @GetMapping(path = "/getAllUsers")
    @ResponseBody
    public String getAllUsers() {
        System.out.println("Hit getAllUsers API");

        List<Users> allUsers = repositoryUsers.findAll();
        String result = "Data ---> ";

        for (int i = 0; i < allUsers.stream().count(); i++) {
            Users a = allUsers.get(i);
            if (a != null) {
                result = result + a.getUsername() + a.getPassword() + ", "
                ;            }
        }
        return result;    }


    @GetMapping(path = "/displaySignInPage")
    public String displaySignInPage() {
        return "loginPage";
    }

}
