package com.example.simplecrud.controllers;

import com.example.simplecrud.entities.Task;
import com.example.simplecrud.entities.User;
import com.example.simplecrud.repositories.UserRepository;
import com.example.simplecrud.services.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/secured/task")
public class TaskController {

    private TaskService taskService;
    private UserRepository userRepository;

    @Autowired
    public void setTaskService(TaskService taskService) {
        this.taskService = taskService;
    }

    @Autowired
    public void setUserRepository(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping
    public ResponseEntity createTask(@RequestBody Task task){
        try {
            return ResponseEntity.ok(taskService.createTask(task, 1L));
        } catch (Exception e){
            return ResponseEntity.badRequest().body("Error: task don't created");
        }
    }

    @GetMapping
    public ResponseEntity<List<Task>> getAllTasksForCurrentUser() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User currentUser = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Получаем все задачи для текущего пользователя
        List<Task> tasks = taskService.getAllTasks(currentUser.getId());
        return ResponseEntity.ok(tasks);
    }

}
