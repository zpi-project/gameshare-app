package com.zpi.backend.reservation_status;

import org.springframework.stereotype.Service;

import static com.zpi.backend.reservation_status.ReservationStatus.*;

@Service
public class ReservationStatusService {
    private final ReservationStatusRepository reservationStatusRepository;

    public ReservationStatusService(ReservationStatusRepository reservationStatusRepository) {
        this.reservationStatusRepository = reservationStatusRepository;
        saveStatuses();
    }

    private void saveStatuses(){
        saveStatus(ACCEPTED_BY_OWNER);
        saveStatus(RENTED);
        saveStatus(PENDING);
        saveStatus(REJECTED_BY_OWNER);
        saveStatus(FINISHED);
        saveStatus(CANCELED_BY_OWNER);
        saveStatus(CANCELED_BY_RENTER);
        saveStatus(EXPIRED);
    }

    private void saveStatus(String status){
        if (!reservationStatusRepository.existsByStatus(status)){
            reservationStatusRepository.save(new ReservationStatus(status));
        }
    }
}
