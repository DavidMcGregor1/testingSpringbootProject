package com.example.JustTryingToCompile;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface AcronymsRepository extends JpaRepository<Acronyms, Integer> {

}
