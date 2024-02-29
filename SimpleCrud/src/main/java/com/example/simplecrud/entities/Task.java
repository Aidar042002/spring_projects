package com.example.simplecrud.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "tasks")
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String description;
    private int count; //need rename to priority

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;

}
