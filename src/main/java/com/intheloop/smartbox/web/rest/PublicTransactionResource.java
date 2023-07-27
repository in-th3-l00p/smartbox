package com.intheloop.smartbox.web.rest;

import com.intheloop.smartbox.service.CardService;
import com.intheloop.smartbox.service.TransactionService;
import com.intheloop.smartbox.web.rest.errors.SlotNotFoundException;
import com.intheloop.smartbox.web.rest.vm.TransactionVM;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/public/transaction")
public class PublicTransactionResource {
    private final TransactionService transactionService;
    private final CardService cardService;

    public PublicTransactionResource(
        TransactionService transactionService,
        CardService cardService
    ) {
        this.transactionService = transactionService;
        this.cardService = cardService;
    }

    public static class SuccessResponse {
        private final String success = "true";

        public SuccessResponse() {
        }

        public String getSuccess() {
            return success;
        }
    }

    public static class ErrorResponse {
        private final String success = "false";
        private final String message;

        public ErrorResponse(String message) {
            this.message = message;
        }

        public String getSuccess() {
            return success;
        }

        public String getMessage() {
            return message;
        }
    }

    @PostMapping(
        consumes = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<?> create(@RequestBody TransactionVM transactionVM) {
        // range validation
        if (transactionVM.getPub() < 1 || transactionVM.getPub() > 200)
            return ResponseEntity.badRequest().body(new ErrorResponse("Invalid pub"));
        if (transactionVM.getCid() < 1 || transactionVM.getCid() > 2000)
            return ResponseEntity.badRequest().body(new ErrorResponse("Invalid cid"));
        if (transactionVM.getSid() < 1 || transactionVM.getSid() > 10)
            return ResponseEntity.badRequest().body(new ErrorResponse("Invalid sid"));
        if (transactionVM.getVol() < -10.0 || transactionVM.getVol() > 10.0)
            return ResponseEntity.badRequest().body(new ErrorResponse("Invalid vol"));
        var card = cardService.get(transactionVM.getCid());

        try {
            transactionService.createTransaction(
                card,
                transactionVM.getSid(),
                transactionVM.getVol()
            );
            return ResponseEntity.ok(new SuccessResponse());
        } catch (SlotNotFoundException e) {
            return ResponseEntity.badRequest().body(new ErrorResponse("Invalid sid"));
        }
    }
}
