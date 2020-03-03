package com.server.configuration.authentication.filter;

import com.server.configuration.authentication.util.AuthUserDetails;
import com.server.entity.Token;
import com.server.repository.TokenRepository;
import com.server.util.AuthorizationHeader;
import com.server.util.TokenString;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.Optional;

public class AuthFilter extends GenericFilterBean {
    TokenRepository tokenRepository;

    public AuthFilter(TokenRepository tokenRepository) {
        this.tokenRepository = tokenRepository;
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws ServletException, IOException {
        String authHeader = AuthorizationHeader.get((HttpServletRequest) request);

        if (!StringUtils.isEmpty(authHeader)) {
            String authToken = TokenString.extract(authHeader);
            Optional<Token> tokenOpt = tokenRepository.findByToken(authToken);

            if (tokenOpt.isPresent()) {
                Token token = tokenOpt.get();
                AuthUserDetails userDetails = new AuthUserDetails(token);
                UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken(userDetails, null, null);

                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        }

        chain.doFilter(request, response);
    }
}
