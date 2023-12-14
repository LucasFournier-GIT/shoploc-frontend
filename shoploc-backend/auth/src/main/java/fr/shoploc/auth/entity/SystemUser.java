package fr.shoploc.auth.entity;

import io.quarkus.elytron.security.common.BcryptUtil;
import io.quarkus.hibernate.reactive.panache.PanacheEntity;
import io.smallrye.mutiny.Uni;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;

import org.mindrot.jbcrypt.BCrypt;

@Entity
public class SystemUser extends PanacheEntity {
    @Column(unique = true)
    public String email;
    @Column
    public String password;
    @Column
    public String birthDate;

    public SystemUser() {
    }

    public SystemUser(String email, String password, String birthDate) {
        this.email = email;
        this.password = password;
        this.birthDate = birthDate;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(String birthDate) {
        this.birthDate = birthDate;
    }
}

