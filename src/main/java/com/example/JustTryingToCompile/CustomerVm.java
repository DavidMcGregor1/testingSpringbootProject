package com.example.JustTryingToCompile;

public class CustomerVm {
    public int id;
    public String firstName;
    public String lastName;
    public int age;

    CustomerVm(int aid, String aFirstName, String aLastName, int aage) {
        id = aid;
        firstName = aFirstName;
        lastName = aLastName;
        age = aage;
    }

    public CustomerVm() {

    }

}
