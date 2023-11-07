insert into public.roles (name)
values  ('user'),
        ('admin')
    ON CONFLICT DO NOTHING;