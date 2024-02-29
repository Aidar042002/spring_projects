package com.example.simplecrud.controllers;

import com.example.simplecrud.entities.Task;
import com.example.simplecrud.entities.User;
import com.example.simplecrud.repositories.UserRepository;
import com.example.simplecrud.services.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
            String username = SecurityContextHolder.getContext().getAuthentication().getName();
            User currentUser = userRepository.findByUsername(username)
                    .orElseThrow(() -> new RuntimeException("User not found"));
            Long userId=currentUser.getId();
            return ResponseEntity.ok(taskService.createTask(task, userId));
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

    @GetMapping("/{id}")
    public ResponseEntity getTaskById(@PathVariable Long id){
        return ResponseEntity.ok(taskService.getTaskById(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTask(@PathVariable Long id) {
        Task deletedTask = taskService.deleteTaskById(id);
        if (deletedTask != null) {
            return ResponseEntity.ok("deleted");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity updateById(@PathVariable Long id, @RequestBody Task updatedTask) {
        try {
            String username = SecurityContextHolder.getContext().getAuthentication().getName();
            User currentUser = userRepository.findByUsername(username)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            Task existingTask = taskService.getTaskById(id)
                    .orElseThrow(() -> new RuntimeException("Task not found"));
            if (!existingTask.getUser().getId().equals(currentUser.getId())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You do not have permission to update this task.");
            }

            updatedTask.setId(id);
            updatedTask.setUser(currentUser);

            Task updated = taskService.updateTask(updatedTask);

            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error updating task: " + e.getMessage());
        }
    }

}
