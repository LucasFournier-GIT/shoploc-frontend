package fr.shoploc.auth.service;

import io.smallrye.jwt.build.Jwt;
import jakarta.inject.Singleton;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

@Singleton
public class AuthJwtService {

    public String generateJwt() {
        Set<String> roles = new HashSet<>(Arrays.asList("admin", "user"));

        return Jwt.issuer("auth")
                .subject("shoploc-manager")
                .groups(roles)
                .expiresAt(
                        System.currentTimeMillis() + 3600
                )
                .sign();
    }
}
