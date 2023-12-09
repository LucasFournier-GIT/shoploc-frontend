package fr.shoploc.auth.resource;

import fr.shoploc.auth.service.AuthJwtService;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/auth")
public class AuthJwtResource {

    @Inject
    AuthJwtService service;

    @GET
    @Path("/getToken")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getJwtToken() {
        String jwt = service.generateJwt();
        return Response.ok(jwt).build();
    }
}
