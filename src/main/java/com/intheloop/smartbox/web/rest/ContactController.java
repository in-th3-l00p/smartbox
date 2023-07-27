package com.intheloop.smartbox.web.rest;

import com.intheloop.smartbox.service.MailService;
import com.intheloop.smartbox.web.rest.vm.ContactVM;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/public/contact")
public class ContactController {
    private final MailService mailService;

    public ContactController(MailService mailService) {
        this.mailService = mailService;
    }

    @PostMapping(
        consumes = MediaType.APPLICATION_JSON_VALUE,
        produces = MediaType.APPLICATION_JSON_VALUE
    )
    public void submit(@RequestBody ContactVM contact) {
        mailService.sendEmail(
            "contact@infopubele.ro",
            String.format("Mesaj de la %s %s", contact.getFirstName(), contact.getLastName()),
            String.format("Prenume: %s\nNume: %s\nEmail: %s\nTelefon: %s\nMesaj: %s", contact.getFirstName(), contact.getLastName(), contact.getEmail(), contact.getPhone(), contact.getMessage()),
            false,
            false
        );
    }
}
