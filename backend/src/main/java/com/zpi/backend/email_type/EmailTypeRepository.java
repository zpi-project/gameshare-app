package com.zpi.backend.email_type;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EmailTypeRepository extends JpaRepository<EmailType, Long> {
    Optional<EmailType> findEmailTypeByType(String type);
}
