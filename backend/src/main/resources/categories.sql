--
-- PostgreSQL database dump
--

-- Dumped from database version 13.1 (Debian 13.1-1.pgdg100+1)
-- Dumped by pg_dump version 13.1 (Debian 13.1-1.pgdg100+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: admin
--

INSERT INTO public.categories (id, name, name_pl) VALUES (0, 'Age of Reason', 'Wiek Pracy');
INSERT INTO public.categories (id, name, name_pl) VALUES (1, 'Economic', 'gospodarczy');
INSERT INTO public.categories (id, name, name_pl) VALUES (2, 'Industry / Manufacturing', 'Branża / Produkcja');
INSERT INTO public.categories (id, name, name_pl) VALUES (3, 'Post-Napoleonic', 'Post-Napoleoński');
INSERT INTO public.categories (id, name, name_pl) VALUES (4, 'Trains', 'Pociągi');
INSERT INTO public.categories (id, name, name_pl) VALUES (5, 'Transportation', 'Transport');
INSERT INTO public.categories (id, name, name_pl) VALUES (6, 'Environmental', 'Środowiskowy');
INSERT INTO public.categories (id, name, name_pl) VALUES (7, 'Medical', 'Medyczny');
INSERT INTO public.categories (id, name, name_pl) VALUES (8, 'Adventure', 'Przygoda');
INSERT INTO public.categories (id, name, name_pl) VALUES (9, 'Exploration', 'Eksploracja');
INSERT INTO public.categories (id, name, name_pl) VALUES (10, 'Fantasy', 'Fantazja');
INSERT INTO public.categories (id, name, name_pl) VALUES (11, 'Fighting', 'Walka');
INSERT INTO public.categories (id, name, name_pl) VALUES (12, 'Miniatures', 'Miniaturki');
INSERT INTO public.categories (id, name, name_pl) VALUES (13, 'Animals', 'Zwierzęta');
INSERT INTO public.categories (id, name, name_pl) VALUES (14, 'Civilization', 'Cywilizacja');
INSERT INTO public.categories (id, name, name_pl) VALUES (15, 'Negotiation', 'Negocjacje');
INSERT INTO public.categories (id, name, name_pl) VALUES (16, 'Political', 'Polityczny');
INSERT INTO public.categories (id, name, name_pl) VALUES (17, 'Science Fiction', 'Fantastyka naukowa');
INSERT INTO public.categories (id, name, name_pl) VALUES (18, 'Space Exploration', 'Eksploracja kosmiczna');
INSERT INTO public.categories (id, name, name_pl) VALUES (19, 'Wargame', 'Gra wojenna');
INSERT INTO public.categories (id, name, name_pl) VALUES (20, 'Territory Building', 'Budowa terytorium');
INSERT INTO public.categories (id, name, name_pl) VALUES (21, 'Movies / TV / Radio theme', 'Filmy / TV / Radio Temat');
INSERT INTO public.categories (id, name, name_pl) VALUES (22, 'Novel-based', 'Opierające się na powieściach');
INSERT INTO public.categories (id, name, name_pl) VALUES (23, 'Civil War', 'Wojna domowa');
INSERT INTO public.categories (id, name, name_pl) VALUES (24, 'Mythology', 'Mitologia');
INSERT INTO public.categories (id, name, name_pl) VALUES (25, 'Card Game', 'Gra karciana');
INSERT INTO public.categories (id, name, name_pl) VALUES (26, 'Modern Warfare', 'Nowoczesna Wojna');
INSERT INTO public.categories (id, name, name_pl) VALUES (27, 'American West', 'Dziki Zachód Ameryki');
INSERT INTO public.categories (id, name, name_pl) VALUES (28, 'Dice', 'Kostki');
INSERT INTO public.categories (id, name, name_pl) VALUES (29, 'Medieval', 'Średniowiecze');
INSERT INTO public.categories (id, name, name_pl) VALUES (30, 'Ancient', 'Starożytny');
INSERT INTO public.categories (id, name, name_pl) VALUES (31, 'City Building', 'Budowa miasta');
INSERT INTO public.categories (id, name, name_pl) VALUES (32, 'Horror', 'Horror');
INSERT INTO public.categories (id, name, name_pl) VALUES (33, 'Nautical', 'Morski');
INSERT INTO public.categories (id, name, name_pl) VALUES (34, 'Farming', 'Rolnictwo');
INSERT INTO public.categories (id, name, name_pl) VALUES (35, 'Puzzle', 'Gra logiczna');
INSERT INTO public.categories (id, name, name_pl) VALUES (36, 'Educational', 'Edukacyjny');
INSERT INTO public.categories (id, name, name_pl) VALUES (37, 'Collectible Components', 'Zbieralne komponenty');
INSERT INTO public.categories (id, name, name_pl) VALUES (38, 'Travel', 'Podróże');
INSERT INTO public.categories (id, name, name_pl) VALUES (39, 'Religious', 'Religijny');

