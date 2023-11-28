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
-- Data for Name: games_categories; Type: TABLE DATA; Schema: public; Owner: admin
--

INSERT INTO public.games_categories (game_id, category_id) VALUES (0, 0);
INSERT INTO public.games_categories (game_id, category_id) VALUES (0, 1);
INSERT INTO public.games_categories (game_id, category_id) VALUES (0, 2);
INSERT INTO public.games_categories (game_id, category_id) VALUES (0, 3);
INSERT INTO public.games_categories (game_id, category_id) VALUES (0, 4);
INSERT INTO public.games_categories (game_id, category_id) VALUES (0, 5);
INSERT INTO public.games_categories (game_id, category_id) VALUES (1, 6);
INSERT INTO public.games_categories (game_id, category_id) VALUES (1, 7);
INSERT INTO public.games_categories (game_id, category_id) VALUES (2, 8);
INSERT INTO public.games_categories (game_id, category_id) VALUES (2, 9);
INSERT INTO public.games_categories (game_id, category_id) VALUES (2, 10);
INSERT INTO public.games_categories (game_id, category_id) VALUES (2, 11);
INSERT INTO public.games_categories (game_id, category_id) VALUES (2, 12);
INSERT INTO public.games_categories (game_id, category_id) VALUES (3, 13);
INSERT INTO public.games_categories (game_id, category_id) VALUES (3, 1);
INSERT INTO public.games_categories (game_id, category_id) VALUES (3, 6);
INSERT INTO public.games_categories (game_id, category_id) VALUES (4, 14);
INSERT INTO public.games_categories (game_id, category_id) VALUES (4, 1);
INSERT INTO public.games_categories (game_id, category_id) VALUES (4, 9);
INSERT INTO public.games_categories (game_id, category_id) VALUES (4, 15);
INSERT INTO public.games_categories (game_id, category_id) VALUES (4, 16);
INSERT INTO public.games_categories (game_id, category_id) VALUES (4, 17);
INSERT INTO public.games_categories (game_id, category_id) VALUES (4, 18);
INSERT INTO public.games_categories (game_id, category_id) VALUES (4, 19);
INSERT INTO public.games_categories (game_id, category_id) VALUES (5, 1);
INSERT INTO public.games_categories (game_id, category_id) VALUES (5, 6);
INSERT INTO public.games_categories (game_id, category_id) VALUES (5, 2);
INSERT INTO public.games_categories (game_id, category_id) VALUES (5, 17);
INSERT INTO public.games_categories (game_id, category_id) VALUES (5, 18);
INSERT INTO public.games_categories (game_id, category_id) VALUES (5, 20);
INSERT INTO public.games_categories (game_id, category_id) VALUES (6, 21);
INSERT INTO public.games_categories (game_id, category_id) VALUES (6, 22);
INSERT INTO public.games_categories (game_id, category_id) VALUES (6, 16);
INSERT INTO public.games_categories (game_id, category_id) VALUES (6, 17);
INSERT INTO public.games_categories (game_id, category_id) VALUES (7, 8);
INSERT INTO public.games_categories (game_id, category_id) VALUES (7, 9);
INSERT INTO public.games_categories (game_id, category_id) VALUES (7, 10);
INSERT INTO public.games_categories (game_id, category_id) VALUES (7, 11);
INSERT INTO public.games_categories (game_id, category_id) VALUES (7, 12);
INSERT INTO public.games_categories (game_id, category_id) VALUES (8, 8);
INSERT INTO public.games_categories (game_id, category_id) VALUES (8, 10);
INSERT INTO public.games_categories (game_id, category_id) VALUES (8, 11);
INSERT INTO public.games_categories (game_id, category_id) VALUES (8, 22);
INSERT INTO public.games_categories (game_id, category_id) VALUES (8, 20);
INSERT INTO public.games_categories (game_id, category_id) VALUES (8, 19);
INSERT INTO public.games_categories (game_id, category_id) VALUES (9, 23);
INSERT INTO public.games_categories (game_id, category_id) VALUES (9, 12);
INSERT INTO public.games_categories (game_id, category_id) VALUES (9, 21);
INSERT INTO public.games_categories (game_id, category_id) VALUES (9, 17);
INSERT INTO public.games_categories (game_id, category_id) VALUES (9, 18);
INSERT INTO public.games_categories (game_id, category_id) VALUES (9, 19);
INSERT INTO public.games_categories (game_id, category_id) VALUES (10, 10);
INSERT INTO public.games_categories (game_id, category_id) VALUES (10, 11);
INSERT INTO public.games_categories (game_id, category_id) VALUES (10, 24);
INSERT INTO public.games_categories (game_id, category_id) VALUES (10, 20);
INSERT INTO public.games_categories (game_id, category_id) VALUES (11, 14);
INSERT INTO public.games_categories (game_id, category_id) VALUES (11, 1);
INSERT INTO public.games_categories (game_id, category_id) VALUES (11, 12);
INSERT INTO public.games_categories (game_id, category_id) VALUES (11, 17);
INSERT INTO public.games_categories (game_id, category_id) VALUES (11, 18);
INSERT INTO public.games_categories (game_id, category_id) VALUES (11, 20);
INSERT INTO public.games_categories (game_id, category_id) VALUES (12, 25);
INSERT INTO public.games_categories (game_id, category_id) VALUES (12, 14);
INSERT INTO public.games_categories (game_id, category_id) VALUES (12, 1);
INSERT INTO public.games_categories (game_id, category_id) VALUES (13, 26);
INSERT INTO public.games_categories (game_id, category_id) VALUES (13, 16);
INSERT INTO public.games_categories (game_id, category_id) VALUES (13, 19);
INSERT INTO public.games_categories (game_id, category_id) VALUES (14, 27);
INSERT INTO public.games_categories (game_id, category_id) VALUES (14, 13);
INSERT INTO public.games_categories (game_id, category_id) VALUES (14, 1);
INSERT INTO public.games_categories (game_id, category_id) VALUES (15, 1);
INSERT INTO public.games_categories (game_id, category_id) VALUES (15, 11);
INSERT INTO public.games_categories (game_id, category_id) VALUES (15, 17);
INSERT INTO public.games_categories (game_id, category_id) VALUES (15, 20);
INSERT INTO public.games_categories (game_id, category_id) VALUES (16, 28);
INSERT INTO public.games_categories (game_id, category_id) VALUES (16, 29);
INSERT INTO public.games_categories (game_id, category_id) VALUES (16, 20);
INSERT INTO public.games_categories (game_id, category_id) VALUES (17, 30);
INSERT INTO public.games_categories (game_id, category_id) VALUES (17, 25);
INSERT INTO public.games_categories (game_id, category_id) VALUES (17, 31);
INSERT INTO public.games_categories (game_id, category_id) VALUES (17, 14);
INSERT INTO public.games_categories (game_id, category_id) VALUES (17, 1);
INSERT INTO public.games_categories (game_id, category_id) VALUES (18, 14);
INSERT INTO public.games_categories (game_id, category_id) VALUES (18, 9);
INSERT INTO public.games_categories (game_id, category_id) VALUES (18, 17);
INSERT INTO public.games_categories (game_id, category_id) VALUES (18, 18);
INSERT INTO public.games_categories (game_id, category_id) VALUES (18, 19);
INSERT INTO public.games_categories (game_id, category_id) VALUES (19, 1);
INSERT INTO public.games_categories (game_id, category_id) VALUES (19, 2);
INSERT INTO public.games_categories (game_id, category_id) VALUES (19, 3);
INSERT INTO public.games_categories (game_id, category_id) VALUES (19, 5);
INSERT INTO public.games_categories (game_id, category_id) VALUES (20, 8);
INSERT INTO public.games_categories (game_id, category_id) VALUES (20, 32);
INSERT INTO public.games_categories (game_id, category_id) VALUES (20, 12);
INSERT INTO public.games_categories (game_id, category_id) VALUES (20, 17);
INSERT INTO public.games_categories (game_id, category_id) VALUES (21, 30);
INSERT INTO public.games_categories (game_id, category_id) VALUES (21, 1);
INSERT INTO public.games_categories (game_id, category_id) VALUES (21, 33);
INSERT INTO public.games_categories (game_id, category_id) VALUES (22, 1);
INSERT INTO public.games_categories (game_id, category_id) VALUES (22, 34);
INSERT INTO public.games_categories (game_id, category_id) VALUES (22, 2);
INSERT INTO public.games_categories (game_id, category_id) VALUES (22, 29);
INSERT INTO public.games_categories (game_id, category_id) VALUES (22, 35);
INSERT INTO public.games_categories (game_id, category_id) VALUES (23, 8);
INSERT INTO public.games_categories (game_id, category_id) VALUES (23, 10);
INSERT INTO public.games_categories (game_id, category_id) VALUES (23, 12);
INSERT INTO public.games_categories (game_id, category_id) VALUES (24, 13);
INSERT INTO public.games_categories (game_id, category_id) VALUES (24, 25);
INSERT INTO public.games_categories (game_id, category_id) VALUES (24, 36);
INSERT INTO public.games_categories (game_id, category_id) VALUES (25, 14);
INSERT INTO public.games_categories (game_id, category_id) VALUES (25, 1);
INSERT INTO public.games_categories (game_id, category_id) VALUES (25, 10);
INSERT INTO public.games_categories (game_id, category_id) VALUES (25, 20);
INSERT INTO public.games_categories (game_id, category_id) VALUES (26, 8);
INSERT INTO public.games_categories (game_id, category_id) VALUES (26, 25);
INSERT INTO public.games_categories (game_id, category_id) VALUES (26, 37);
INSERT INTO public.games_categories (game_id, category_id) VALUES (26, 9);
INSERT INTO public.games_categories (game_id, category_id) VALUES (26, 10);
INSERT INTO public.games_categories (game_id, category_id) VALUES (26, 32);
INSERT INTO public.games_categories (game_id, category_id) VALUES (26, 22);
INSERT INTO public.games_categories (game_id, category_id) VALUES (27, 8);
INSERT INTO public.games_categories (game_id, category_id) VALUES (27, 30);
INSERT INTO public.games_categories (game_id, category_id) VALUES (27, 9);
INSERT INTO public.games_categories (game_id, category_id) VALUES (27, 38);
INSERT INTO public.games_categories (game_id, category_id) VALUES (28, 13);
INSERT INTO public.games_categories (game_id, category_id) VALUES (28, 10);
INSERT INTO public.games_categories (game_id, category_id) VALUES (28, 20);
INSERT INTO public.games_categories (game_id, category_id) VALUES (28, 19);
INSERT INTO public.games_categories (game_id, category_id) VALUES (29, 29);
INSERT INTO public.games_categories (game_id, category_id) VALUES (29, 39);
INSERT INTO public.games_categories (game_id, category_id) VALUES (29, 38);


--
-- PostgreSQL database dump complete
--
