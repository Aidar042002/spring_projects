package com.example.simplecrud.config;

import com.example.simplecrud.jwt.JwtCore;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class TokenFilter extends OncePerRequestFilter {

    private JwtCore jwtCore;
    private UserDetailsService userDetailsService;

    @Autowired
    public void setJwtCore(JwtCore jwtCore) {
        this.jwtCore = jwtCore;
    }

    @Autowired
    public void setUserDetailsService(UserDetailsService userDetailsService) {
        this.userDetailsService = userDetailsService;
    }

    //    @Override
//    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
//        String jwt=null;
//        String username =null;
//        UserDetails userDetails=null;
//        UsernamePasswordAuthenticationToken auth=null;
//        try {
//            String headerAuth=request.getHeader("Authorization");
//            if(headerAuth != null && headerAuth.startsWith("Bearer ")){
//                jwt=headerAuth.substring(7);
//            }
//            if(jwt!= null){
//                try {
//                    username=jwtCore.getNameFromJwt(jwt);
//                } catch (ExpiredJwtException e){
//
//                }
//                if(username != null && SecurityContextHolder.getContext().getAuthentication() == null){
//                    userDetails=userDetailsService.loadUserByUsername(username);
//                    auth=new UsernamePasswordAuthenticationToken(
//                            userDetails, null
//                    );
//                    SecurityContextHolder.getContext().setAuthentication(auth);
//                }
//            }
//        } catch (Exception e){
//            //later
//        }
//        filterChain.doFilter(request, response);
//    }
    private static final Logger logger = LoggerFactory.getLogger(TokenFilter.class);

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        try {
            String jwt = parseJwt(request);
            UserDetails userDetails=null;
            if (jwt != null) {
                try {
                    String username = jwtCore.getNameFromJwt(jwt);
                    userDetails = userDetailsService.loadUserByUsername(username);
                } catch (ExpiredJwtException e){
                    ///
                }

                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities());
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        } catch (Exception e) {
            logger.error("Cannot set user authentication: {}", e);
        }

        filterChain.doFilter(request, response);
    }

    private String parseJwt(HttpServletRequest request) {
        String headerAuth = request.getHeader("Authorization");

        if (StringUtils.hasText(headerAuth) && headerAuth.startsWith("Bearer ")) {
            return headerAuth.substring(7, headerAuth.length());
        }

        return null;
    }
}