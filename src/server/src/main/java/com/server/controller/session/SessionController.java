package com.server.controller.session;

import com.server.configuration.authentication.annotation.IsAuthenticated;
import com.server.configuration.authentication.util.AuthUserDetails;
import com.server.controller.session.exception.UserNotFoundException;
import com.server.controller.session.exception.InvalidPasswordException;
import com.server.controller.session.request.PostRequest;
import com.server.entity.Token;
import com.server.entity.User;
import com.server.model.SessionModel;
import com.server.model.TokenModel;
import com.server.repository.TokenRepository;
import com.server.repository.UserRepository;
import com.server.util.HashGenerator;
import com.server.model.payload.SessionPayload;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Optional;

@RestController
@RequestMapping("/session")
public class SessionController {
    private static final String controllerName = "SESSION";

    @Autowired
    private TokenRepository tokenRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    @IsAuthenticated
    public SessionPayload get(Authentication authentication) {
        AuthUserDetails userDetails = (AuthUserDetails) authentication.getPrincipal();
        return SessionModel.createPayload(userDetails.getUser(), userDetails.getToken());
    }

    @PostMapping
    public SessionPayload post(@Valid @RequestBody PostRequest req)
            throws UserNotFoundException, InvalidPasswordException {
        Optional<User> userOpt = userRepository.findByUsername(req.username);
        if (!userOpt.isPresent()) throw new UserNotFoundException(controllerName, req.username);

        User user = userOpt.get();
        String saltedPassword = HashGenerator.sha256(req.password, user.getSalt());
        if (!saltedPassword.equals(user.getPassword())) {
            throw new InvalidPasswordException(controllerName, req.username);
        }

        Token token = TokenModel.create();
        token.setUser(user);

        tokenRepository.save(token);

        return SessionModel.createPayload(user, token);
    }

    @DeleteMapping
    @IsAuthenticated
    public ResponseEntity delete(Authentication authentication) {
        AuthUserDetails userDetails = (AuthUserDetails) authentication.getPrincipal();
        tokenRepository.delete(userDetails.getToken());

        return new ResponseEntity(HttpStatus.OK);
    }
}
