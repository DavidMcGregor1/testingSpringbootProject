package com.example.JustTryingToCompile;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.FORBIDDEN, reason = "DENIEDDDDDD")
public class AccessDeniedExeption extends RuntimeException {

}
