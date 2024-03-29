package com.intheloop.smartbox.web.filter;


import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

public class SPAWebFilter extends OncePerRequestFilter {

    /**
     * Forwards any unmapped paths (except those containing a period) to the client {@code index.html}.
     */
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
        throws ServletException, IOException {
        String path = request.getRequestURI();
        if (
            !path.startsWith("/api") &&
                !path.startsWith("/management") &&
                !path.startsWith("/v3/api-docs") &&
                !path.contains(".") &&
                path.matches("/(.*)")
        ) {
            request.getRequestDispatcher("/index.html").forward(request, response);
            return;
        }

        filterChain.doFilter(request, response);
    }
}
