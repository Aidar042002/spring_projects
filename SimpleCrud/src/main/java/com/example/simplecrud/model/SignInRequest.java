package com.example.simplecrud.model;

import lombok.Data;

@Data
public class SignInRequest {
    private String username;
    private String password;
}