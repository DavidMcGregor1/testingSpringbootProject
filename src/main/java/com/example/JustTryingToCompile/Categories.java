package com.example.JustTryingToCompile;

import javax.persistence.*;
import java.util.Set;


@Table(name = "Categories")
@Entity
public class Categories {

    private int id;
    private String category;

    @OneToMany
    private Set<Categories> theCategories;




    public Categories() {

    }

    public Categories(String category) {
        this.category = category;
    }



    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Column(name = "Category", nullable = false)
    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }







}