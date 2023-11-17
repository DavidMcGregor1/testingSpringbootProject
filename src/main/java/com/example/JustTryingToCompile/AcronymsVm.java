package com.example.JustTryingToCompile;

public class AcronymsVm {
    public int id;
    public String category;
    public String acronyms;
    public String meaning;
    public String falseAnswer1;
    public String falseAnswer2;
    public String falseAnswer3;
    public String description;


    AcronymsVm(int aid, String acategory, String aacronyms, String ameaning, String afalseAnswer1, String afalseAnswer2, String afalseAnswer3, String adescription) {
        id = aid;
        category = acategory;
        acronyms = aacronyms;
        meaning = ameaning;
        falseAnswer1 = afalseAnswer1;
        falseAnswer2 = afalseAnswer2;
        falseAnswer3 = afalseAnswer3;
        description = adescription;

    }

    public AcronymsVm() {

    }

}
