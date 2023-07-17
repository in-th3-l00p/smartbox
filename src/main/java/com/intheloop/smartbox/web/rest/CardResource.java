package com.intheloop.smartbox.web.rest;

import com.intheloop.smartbox.domain.Card;
import com.intheloop.smartbox.service.CardService;
import com.intheloop.smartbox.service.DeviceService;
import com.intheloop.smartbox.service.UserService;
import com.intheloop.smartbox.service.dto.CardDTO;
import com.intheloop.smartbox.web.rest.errors.CardNotFound;
import com.intheloop.smartbox.web.rest.errors.DeviceNotFoundException;
import com.intheloop.smartbox.web.rest.errors.UserNotFound;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/card")
public class CardResource {
    private final CardService cardService;
    private final DeviceService deviceService;
    private final UserService userService;

    public CardResource(CardService cardService, DeviceService deviceService, UserService userService) {
        this.cardService = cardService;
        this.deviceService = deviceService;
        this.userService = userService;
    }

    /**
     * {@code POST /api/admin/card} : Create a new card
     * @param userId : user id
     * @param deviceId : device id
     * @return the {@link CardDTO} with status {@code 201 (CREATED)}, or status {@code 400 (BAD REQUEST)} if user already has a card
     * @throws DeviceNotFoundException if device doesn't exist, with status {@code 404 (NOT FOUND)}
     * @throws UserNotFound if user doesn't exist, with status {@code 404 (NOT FOUND)}
     */
    @PostMapping
    public ResponseEntity<?> createCard(
        @RequestParam("userId") Long userId,
        @RequestParam("deviceId") Long deviceId
    ) {
        var user = userService.get(userId);
        if (user.getCard() != null)
            return ResponseEntity.badRequest().build();
        var device = deviceService.get(deviceId);
        return ResponseEntity.ok(
            new CardDTO(cardService.create(user, device))
        );
    }

    /**
     * {@code PUT /api/admin/card/{cardId}} : Update a card
     * @param cardId : card id
     * @param deviceId : new device id
     * @return the {@link CardDTO} with status {@code 200 (OK)}
     * @throws CardNotFound if card doesn't exist, with status {@code 404 (NOT FOUND)}
     */
    @PutMapping("/{cardId}")
    public CardDTO updateCard(
        @PathVariable Long cardId,
        @RequestParam("deviceId") Long deviceId
    ) {
        var card = cardService.get(cardId);
        var device = deviceService.get(deviceId);
        return new CardDTO(cardService.update(card, device));
    }

    /**
     * {@code DELETE /api/admin/card/{cardId}} : deletes a card
     * @param cardId : card's id
     * @throws CardNotFound if card doesn't exist, with status {@code 404 (NOT FOUND)}
     */
    @DeleteMapping("/{cardId}")
    public void deleteCard(@PathVariable Long cardId) {
        var card = cardService.get(cardId);
        cardService.delete(card);
    }
}
