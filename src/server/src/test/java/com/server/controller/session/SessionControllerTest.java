package com.server.controller.session;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.server.entity.Token;
import com.server.entity.User;
import com.server.model.TokenModel;
import com.server.model.UserModel;
import com.server.repository.TokenRepository;
import com.server.repository.UserRepository;
import org.json.JSONObject;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;

import java.util.ArrayList;
import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@AutoConfigureMockMvc
class SessionControllerTest {
    private static final String ROUTE = "/session";
    private static final String USERNAME = "test@test.com";
    private static final String PASSWORD = "test";

    private User user;
    private Token token;

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private TokenRepository tokenRepository;

    @Autowired
    private UserRepository userRepository;

    @BeforeEach
    void beforeEach() {
        user = UserModel.create(USERNAME, PASSWORD);
        token = TokenModel.create();
        token.setUser(user);

        ArrayList<Token> tokens = new ArrayList<>();
        tokens.add(token);

        user.setTokens(tokens);

        userRepository.save(user);
    }

    @AfterEach
    void afterEach() {
        userRepository.deleteAll();
    }

    @Nested
    class getRoute {
        @Nested
        class whenUserDoesntProvideAValidToken {
            @Test
            public void returnsAccessForbiddenStatus() throws Exception {
                MockHttpServletRequestBuilder getRequest = get(ROUTE);

                ResultActions result = mockMvc.perform(getRequest).andDo(print());

                result.andExpect(status().isForbidden());
            }
        }

        @Nested
        class whenUserProvidesAValidToken {
            @Test
            public void returnsSessionObject() throws Exception {
                String authHeader = "Bearer " + token.getToken();
                MockHttpServletRequestBuilder getRequest = get(ROUTE).header("Authorization", authHeader);

                ResultActions result = mockMvc.perform(getRequest).andDo(print());

                JSONObject resultJson = new JSONObject(Map.of(
                    "username", user.getUsername(),
                    "token", token.getToken()
                ));
                result
                    .andExpect(status().isOk())
                    .andExpect(content().json(resultJson.toString()));
            }
        }
    }

    @Nested
    class postRoute {
        @Nested
        class whenNonExistingUsernameIsProvided {
            @Test
            public void returnsNotFoundStatus() throws Exception {
                JSONObject payload = new JSONObject(Map.of(
                    "username", "someUsername",
                    "password", "somePassword"
                ));
                MockHttpServletRequestBuilder postRequest = post(ROUTE)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(payload.toString());

                ResultActions result = mockMvc.perform(postRequest).andDo(print());

                result.andExpect(status().isNotFound());
            }
        }

        @Nested
        class whenExistingUsernameIsProvided {
            @Nested
            class whenInvalidPasswordWasProvided {
                @Test
                public void returnsAccessForbiddenStatus() throws Exception {
                    JSONObject payload = new JSONObject(Map.of(
                        "username", user.getUsername(),
                        "password", "somePassword"
                    ));
                    MockHttpServletRequestBuilder postRequest = post(ROUTE)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(payload.toString());

                    ResultActions result = mockMvc.perform(postRequest).andDo(print());

                    result.andExpect(status().isForbidden());
                }
            }

            @Nested
            class whenValidPasswordWasProvided {
                @Test
                public void returnsSessionObject() throws Exception {
                    JSONObject payload = new JSONObject(Map.of(
                        "username", user.getUsername(),
                        "password", PASSWORD
                    ));
                    MockHttpServletRequestBuilder postRequest = post(ROUTE)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(payload.toString());

                    ResultActions result = mockMvc.perform(postRequest).andDo(print());

                    result.andExpect(status().isOk());
                }
            }

        }
    }

    @Nested
    class deleteRoute {
        @Nested
        class whenUserDoesntProvideAValidToken {
            @Test
            public void returnsAccessForbiddenStatus() throws Exception {
                MockHttpServletRequestBuilder deleteRequest = delete(ROUTE);

                ResultActions result = mockMvc.perform(deleteRequest).andDo(print());

                result.andExpect(status().isForbidden());
            }
        }

        @Nested
        class whenUserProvidesAValidToken {
            @Test
            public void removesUserTokenFromTheDb() throws Exception {
                String tokenString = token.getToken();
                String authHeader = "Bearer " + tokenString;
                MockHttpServletRequestBuilder deleteRequest = delete(ROUTE).header("Authorization", authHeader);

                ResultActions result = mockMvc.perform(deleteRequest).andDo(print());

                result.andExpect(status().isOk());
                assertThat(tokenRepository.findByToken(tokenString).isPresent()).isFalse();
            }
        }
    }
}
