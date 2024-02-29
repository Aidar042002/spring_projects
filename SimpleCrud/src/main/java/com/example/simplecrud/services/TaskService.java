package com.example.simplecrud.services;

import com.example.simplecrud.config.TokenFilter;
import com.example.simplecrud.entities.Task;
import com.example.simplecrud.entities.User;
import com.example.simplecrud.repositories.TaskRepository;
import com.example.simplecrud.repositories.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;

import java.util.List;

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
}
