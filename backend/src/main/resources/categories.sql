--
-- PostgreSQL database dump
--

-- Dumped from database version 13.1 (Debian 13.1-1.pgdg100+1)
-- Dumped by pg_dump version 13.1 (Debian 13.1-1.pgdg100+1)

--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: admin
--

INSERT INTO public.categories (id, name, name_pl) VALUES (0, 'Age of Reason', 'Wiek Pracy') ON CONFLICT DO NOTHING;
INSERT INTO public.categories (id, name, name_pl) VALUES (1, 'Economic', 'gospodarczy') ON CONFLICT DO NOTHING;
INSERT INTO public.categories (id, name, name_pl) VALUES (2, 'Industry / Manufacturing', 'Branża / Produkcja') ON CONFLICT DO NOTHING;
INSERT INTO public.categories (id, name, name_pl) VALUES (3, 'Post-Napoleonic', 'Post-Napoleoński') ON CONFLICT DO NOTHING;
INSERT INTO public.categories (id, name, name_pl) VALUES (4, 'Trains', 'Pociągi') ON CONFLICT DO NOTHING;
INSERT INTO public.categories (id, name, name_pl) VALUES (5, 'Transportation', 'Transport') ON CONFLICT DO NOTHING;
INSERT INTO public.categories (id, name, name_pl) VALUES (6, 'Environmental', 'Środowiskowy') ON CONFLICT DO NOTHING;
INSERT INTO public.categories (id, name, name_pl) VALUES (7, 'Medical', 'Medyczny') ON CONFLICT DO NOTHING;
INSERT INTO public.categories (id, name, name_pl) VALUES (8, 'Adventure', 'Przygoda') ON CONFLICT DO NOTHING;
INSERT INTO public.categories (id, name, name_pl) VALUES (9, 'Exploration', 'Eksploracja') ON CONFLICT DO NOTHING;
INSERT INTO public.categories (id, name, name_pl) VALUES (10, 'Fantasy', 'Fantazja') ON CONFLICT DO NOTHING;
INSERT INTO public.categories (id, name, name_pl) VALUES (11, 'Fighting', 'Walka') ON CONFLICT DO NOTHING;
INSERT INTO public.categories (id, name, name_pl) VALUES (12, 'Miniatures', 'Miniaturki') ON CONFLICT DO NOTHING;
INSERT INTO public.categories (id, name, name_pl) VALUES (13, 'Animals', 'Zwierzęta') ON CONFLICT DO NOTHING;
INSERT INTO public.categories (id, name, name_pl) VALUES (14, 'Civilization', 'Cywilizacja') ON CONFLICT DO NOTHING;
INSERT INTO public.categories (id, name, name_pl) VALUES (15, 'Negotiation', 'Negocjacje') ON CONFLICT DO NOTHING;
INSERT INTO public.categories (id, name, name_pl) VALUES (16, 'Political', 'Polityczny') ON CONFLICT DO NOTHING;
INSERT INTO public.categories (id, name, name_pl) VALUES (17, 'Science Fiction', 'Fantastyka naukowa') ON CONFLICT DO NOTHING;
INSERT INTO public.categories (id, name, name_pl) VALUES (18, 'Space Exploration', 'Eksploracja kosmiczna') ON CONFLICT DO NOTHING;
INSERT INTO public.categories (id, name, name_pl) VALUES (19, 'Wargame', 'Gra wojenna') ON CONFLICT DO NOTHING;
INSERT INTO public.categories (id, name, name_pl) VALUES (20, 'Territory Building', 'Budowa terytorium') ON CONFLICT DO NOTHING;
INSERT INTO public.categories (id, name, name_pl) VALUES (21, 'Movies / TV / Radio theme', 'Filmy / TV / Radio Temat') ON CONFLICT DO NOTHING;
INSERT INTO public.categories (id, name, name_pl) VALUES (22, 'Novel-based', 'Opierające się na powieściach') ON CONFLICT DO NOTHING;
INSERT INTO public.categories (id, name, name_pl) VALUES (23, 'Civil War', 'Wojna domowa') ON CONFLICT DO NOTHING;
INSERT INTO public.categories (id, name, name_pl) VALUES (24, 'Mythology', 'Mitologia') ON CONFLICT DO NOTHING;
INSERT INTO public.categories (id, name, name_pl) VALUES (25, 'Card Game', 'Gra karciana') ON CONFLICT DO NOTHING;
INSERT INTO public.categories (id, name, name_pl) VALUES (26, 'Modern Warfare', 'Nowoczesna Wojna') ON CONFLICT DO NOTHING;
INSERT INTO public.categories (id, name, name_pl) VALUES (27, 'American West', 'Dziki Zachód Ameryki') ON CONFLICT DO NOTHING;
INSERT INTO public.categories (id, name, name_pl) VALUES (28, 'Dice', 'Kostki') ON CONFLICT DO NOTHING;
INSERT INTO public.categories (id, name, name_pl) VALUES (29, 'Medieval', 'Średniowiecze') ON CONFLICT DO NOTHING;
INSERT INTO public.categories (id, name, name_pl) VALUES (30, 'Ancient', 'Starożytny') ON CONFLICT DO NOTHING;
INSERT INTO public.categories (id, name, name_pl) VALUES (31, 'City Building', 'Budowa miasta') ON CONFLICT DO NOTHING;
INSERT INTO public.categories (id, name, name_pl) VALUES (32, 'Horror', 'Horror') ON CONFLICT DO NOTHING;
INSERT INTO public.categories (id, name, name_pl) VALUES (33, 'Nautical', 'Morski') ON CONFLICT DO NOTHING;
INSERT INTO public.categories (id, name, name_pl) VALUES (34, 'Farming', 'Rolnictwo') ON CONFLICT DO NOTHING;
INSERT INTO public.categories (id, name, name_pl) VALUES (35, 'Puzzle', 'Gra logiczna') ON CONFLICT DO NOTHING;
INSERT INTO public.categories (id, name, name_pl) VALUES (36, 'Educational', 'Edukacyjny') ON CONFLICT DO NOTHING;
INSERT INTO public.categories (id, name, name_pl) VALUES (37, 'Collectible Components', 'Zbieralne komponenty') ON CONFLICT DO NOTHING;
INSERT INTO public.categories (id, name, name_pl) VALUES (38, 'Travel', 'Podróże') ON CONFLICT DO NOTHING;
INSERT INTO public.categories (id, name, name_pl) VALUES (39, 'Religious', 'Religijny') ON CONFLICT DO NOTHING;

