package fr.shoploc.auth.service;

import fr.shoploc.auth.entity.SystemUser;
import io.quarkus.hibernate.reactive.panache.common.WithTransaction;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

public class AuthUserService {

    @Inject
    AuthJwtService jwtService;

//    public Uni<SystemUser> connectAsUser(String email, String password) {
//        return userRepository.find("adresse_mail", email).firstResult();
//        if (user != null && user.checkPassword(password)) {
//            return user; //jwtService.generateJwtForUser(user.getId());
//        } else {
//            return null;
//        }
//    }

//    @WithTransaction
//    public Uni<SystemUser> registerAsUser(String email, String password, String birthDate) {
//        SystemUser systemUser = new SystemUser();
//        systemUser.setEmail(email);
//        systemUser.setPassword(password);
//        systemUser.setBirthDate(birthDate);
//        return userRepository.persist(systemUser);
//    }

    //Je pense que nous avons bien avancé l'étape "connexion" où un utilisateur vient renseigner ses credentials et obtient un JWT s'ils sont corrects. J'aimerais qu'on passe à présent à l'étape inscription, où l'utilisateur va renseigner son username, son password, et une date de naissance, et on va l'enregistrer dans la base de données. J'ai déjà un endpoint pour cela :
}
