package com.example.JustTryingToCompile;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AcronymsRepository extends JpaRepository<Acronyms, Integer> {

    Optional<Acronyms> findByCategory(String category);
    List<Acronyms> findByCategoryIgnoreCase(String category);
    List<Acronyms> findByLength(int length);

}
