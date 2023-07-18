package com.intheloop.smartbox.web.rest;

import com.intheloop.smartbox.security.SecurityUtils;
import com.intheloop.smartbox.service.TransactionService;
import com.intheloop.smartbox.service.UserService;
import com.intheloop.smartbox.service.dto.TransactionDTO;
import com.intheloop.smartbox.web.rest.errors.UserNotFound;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/transaction")
public class TransactionResource {
    private final TransactionService transactionService;
    private final UserService userService;

    public TransactionResource(
        TransactionService transactionService,
        UserService userService
    ) {
        this.transactionService = transactionService;
        this.userService = userService;
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public List<TransactionDTO> getUserTransactions(
        @PageableDefault(sort = "createdDate", direction = Sort.Direction.DESC)
        @ParameterObject
        Pageable pageable
    ) {
        var userLogin = SecurityUtils
            .getCurrentUserLogin()
            .orElseThrow(UserNotFound::new);
        var user = userService.get(userLogin);
        return transactionService
            .getUserTransactions(user, pageable)
            .stream()
            .map(TransactionDTO::new).toList();
    }
}
