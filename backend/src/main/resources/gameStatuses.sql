insert into public.Game_statuses (status)
values  ('Accepted'),
        ('Rejected'),
        ('Pending')
    ON CONFLICT DO NOTHING;