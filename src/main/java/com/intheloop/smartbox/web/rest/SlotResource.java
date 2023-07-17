package com.intheloop.smartbox.web.rest;

import com.intheloop.smartbox.service.DeviceService;
import com.intheloop.smartbox.service.SlotService;
import com.intheloop.smartbox.service.dto.SlotDTO;
import com.intheloop.smartbox.web.rest.errors.DeviceNameAlreadyUsedException;
import com.intheloop.smartbox.web.rest.errors.SlotNotFoundException;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/slot")
public class SlotResource {
    private final SlotService slotService;
    private final DeviceService deviceService;

    public SlotResource(SlotService slotService, DeviceService deviceService) {
        this.slotService = slotService;
        this.deviceService = deviceService;
    }

    /**
     * {@code POST /api/admin/slot/{deviceId}} : Create a new slot
     * @param deviceId : device id
     * @param slotDTO : slot DTO
     * @throws DeviceNameAlreadyUsedException if the given name is already used, with status {@code 404 (NOT FOUND)}
     */
    @PostMapping(
        path = "/{deviceId}",
        consumes = MediaType.APPLICATION_JSON_VALUE
    )
    public void createSlot(
        @PathVariable Long deviceId,
        @RequestBody SlotDTO slotDTO
    ) {
        var device = deviceService.get(deviceId);
        slotService.create(device, slotDTO.getCapacity());
    }

    /**
     * {@code PUT /api/admin/slot/{slotId}} : Update a slot
     * @param slotId : slot id
     * @param capacity : new capacity
     * @throws SlotNotFoundException if slot doesn't exist, with status {@code 404 (NOT FOUND)}
     */
    @PutMapping("/{slotId}")
    public void updateSlot(@PathVariable Long slotId, @RequestParam("capacity") Double capacity) {
        var slot = slotService.get(slotId);
        slotService.updateCapacity(slot, capacity);
    }

    /**
     * {@code DELETE /api/admin/slot/{slotId}} : deletes a slot
     * @param slotId : slot's id
     * @throws SlotNotFoundException if slot doesn't exist, with status {@code 404 (NOT FOUND)}
     */
    @DeleteMapping("/{slotId}")
    public void deleteSlot(@PathVariable Long slotId) {
        var slot = slotService.get(slotId);
        slotService.delete(slot);
    }
}
