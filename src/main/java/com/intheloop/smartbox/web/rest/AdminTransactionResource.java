package com.intheloop.smartbox.web.rest;

import com.intheloop.smartbox.security.AuthoritiesConstants;
import com.intheloop.smartbox.service.TransactionService;
import com.intheloop.smartbox.service.dto.TransactionDTO;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/admin/transaction")
public class AdminTransactionResource {
    private final TransactionService transactionService;

    public AdminTransactionResource(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    /**
     * {@code GET /api/admin/transaction/all} : Get all transactions
     * @param pageable : page request
     * @return list of transactions
     */
    @GetMapping(
        path = "/all",
        produces = MediaType.APPLICATION_JSON_VALUE
    )
    @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.ADMIN + "\")")
    public List<TransactionDTO> getAll(
        @PageableDefault(sort = "createdDate", direction = Sort.Direction.DESC)
        @ParameterObject
        Pageable pageable
    ) {
        return transactionService
            .getAll(pageable)
            .stream()
            .map(TransactionDTO::new).toList();
    }
}
