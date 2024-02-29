package com.example.simplecrud.services;

import com.example.simplecrud.entities.Task;
import com.example.simplecrud.entities.User;
import com.example.simplecrud.repositories.TaskRepository;
import com.example.simplecrud.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaskService {


    private TaskRepository taskRepository;
    private UserRepository userRepository;


    @Autowired
    public void setTaskRepository(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @Autowired
    public void setUserRepository(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Task createTask(Task task, Long userId){
        User user=userRepository.findById(userId).get();
        task.setUser(user);
        return taskRepository.save(task);
    }

    public List<Task> getAllTasks(Long userId){
        return taskRepository.findByUserId(userId);
    }

    public Optional<Task> getTaskById(Long id){
        return taskRepository.findById(id);
    }

    public Task deleteTaskById(Long id){
        Optional<Task> taskOptional = taskRepository.findById(id);
        if (taskOptional.isPresent()) {
            Task deletedTask = taskOptional.get();
            taskRepository.deleteById(id);
            return deletedTask;
        } else {
            return null;
        }
    }

    public Task updateTask(Task updatedTask) {
        Optional<Task> existingTaskOptional = taskRepository.findById(updatedTask.getId());
        if (existingTaskOptional.isPresent()) {
            Task existingTask = existingTaskOptional.get();

            existingTask.setTitle(updatedTask.getTitle());
            existingTask.setDescription(updatedTask.getDescription());
            existingTask.setCount(updatedTask.getCount());

            return taskRepository.save(existingTask);
        } else {
            throw new RuntimeException("Task not found");
        }
    }

}
