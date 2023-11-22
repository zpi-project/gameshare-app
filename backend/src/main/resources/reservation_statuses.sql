insert into public.reservation_status (status)
values  ('ACCEPTED_BY_OWNER'),
        ('REJECTED_BY_OWNER'),
        ('PENDING'),
        ('CANCELED_BY_RENTER'),
        ('CANCELED_BY_OWNER'),
        ('RENTED'),
        ('FINISHED'),
        ('EXPIRED')
    ON CONFLICT DO NOTHING;
