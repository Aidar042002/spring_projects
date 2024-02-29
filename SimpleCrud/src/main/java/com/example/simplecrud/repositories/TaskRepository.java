package com.example.simplecrud.repositories;

import com.example.simplecrud.entities.Task;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends CrudRepository<Task, Long> {
    List<Task> findByUserId(Long userId);
}
