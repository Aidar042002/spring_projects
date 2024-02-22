package com.example.simplecrud.services;

import com.example.simplecrud.entities.User;
import com.example.simplecrud.model.UserDetailsImpl;
import com.example.simplecrud.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserService implements UserDetailsService {

    private UserRepository userRepository;

    @Autowired
    public void setUserRepository(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user=userRepository.findByUsername(username).orElseThrow(
                ()->new UsernameNotFoundException(String.format("user '%s' not exist"))
        );
        return UserDetailsImpl.build(user);
    }
}
