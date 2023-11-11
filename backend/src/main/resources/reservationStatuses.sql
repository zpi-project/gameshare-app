insert into public.reservation_status (status)
values  ('Accepted by owner'),
        ('Rejected by owner'),
        ('Pending'),
        ('Canceled by renter'),
        ('Canceled by owner'),
        ('Rented'),
        ('Finished'),
        ('Expired')
    ON CONFLICT DO NOTHING;
