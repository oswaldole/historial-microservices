package com.historial.auth.service;

import com.historial.auth.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String numFicha) throws UsernameNotFoundException {
        return userRepository.findByNumFicha(numFicha)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with ficha: " + numFicha));
    }
}
