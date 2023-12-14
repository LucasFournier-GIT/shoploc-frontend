package fr.shoploc.auth.service;

import io.smallrye.jwt.build.Jwt;
import jakarta.inject.Singleton;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

@Singleton
public class AuthJwtService {

    public String generateJwtForUser(Long userId) {
        return Jwt.issuer("auth")
                .subject(String.valueOf(userId))
                .groups("user")
                .expiresAt(
                        System.currentTimeMillis() + 3600
                )
                .sign();
    }
}
