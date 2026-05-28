--
-- PostgreSQL database dump
--

\restrict jwSYBr7h5KnrbwAjY4sSJedVCpyJaAUJj1fufWgKP2Athc8GMya33mBkJUwNXiY

-- Dumped from database version 16.13 (Ubuntu 16.13-0ubuntu0.24.04.1)
-- Dumped by pg_dump version 16.13 (Ubuntu 16.13-0ubuntu0.24.04.1)

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
-- Data for Name: Folder; Type: TABLE DATA; Schema: public; Owner: madhav-jariwala
--

COPY public."Folder" (id, name) FROM stdin;
7	Jariwala
6	Shreya
9	Madhav
\.


--
-- Data for Name: Files; Type: TABLE DATA; Schema: public; Owner: madhav-jariwala
--

COPY public."Files" (id, name, "timestamp", "folderId", size, url, path) FROM stdin;
15	token.pdf	2026-05-28 12:50:15.82	6	49	https://kaaramuokgmlukyyorjr.supabase.co/storage/v1/object/public/uploader/1779972614497-token.pdf	1779972614497-token.pdf
\.


--
-- Data for Name: Session; Type: TABLE DATA; Schema: public; Owner: madhav-jariwala
--

COPY public."Session" (id, sid, data, "expiresAt") FROM stdin;
ucO6tR3-7vWWlGl7Vu83O9h_4KYj0V0P	ucO6tR3-7vWWlGl7Vu83O9h_4KYj0V0P	{"cookie":{"originalMaxAge":604800000,"expires":"2026-06-04T13:30:40.690Z","httpOnly":true,"path":"/"},"passport":{"user":1}}	2026-06-04 13:30:40.69
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: madhav-jariwala
--

COPY public."User" (id, username, firstname, lastname, password) FROM stdin;
1	madhavjari	madhav	jariwala	$2b$10$G9WzfoDm6.OLZBIAnzYz1uqyliExSOf5nGopgMBBMPsop5NI2lk0O
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: madhav-jariwala
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
d7de73fc-b46a-4518-a53b-1a5bbdc87097	7f5237526f144aa9edcd5139d38ce456c06a1fffaf3cf4408e576b8a2d6e6957	2026-05-16 17:17:37.514812+05:30	20260516110915_init	\N	\N	2026-05-16 17:17:37.482235+05:30	1
a00ec686-dfbe-40c5-a524-3a46e5f2f224	a8cfb89243770991294584bb711bd1a0b7daaebe763f3d89c36fa4109f65d171	2026-05-16 19:21:36.060815+05:30	20260516135136_init	\N	\N	2026-05-16 19:21:36.033198+05:30	1
443c725a-2cbf-46ce-b9fb-0eec868a4e6b	8d4d642ff3a736a0728411b51e4009e6073878bf1dceac65a48a150dd0b147ec	2026-05-18 15:37:08.935021+05:30	20260518100708_init	\N	\N	2026-05-18 15:37:08.888498+05:30	1
8d26f415-db30-4484-a133-94a67a5cc05e	10ce1f9cd1f0ebd65e520a9c69a3fdba8c21558a2967f9f34ab6cbddf5d49e23	2026-05-20 20:51:27.948542+05:30	20260520152127_init	\N	\N	2026-05-20 20:51:27.934636+05:30	1
983aed61-3f91-4521-b053-1cf3c1fbd8c7	2dac5dfae19a2bcb93d6e54621f7c0037d0323b6222208bbd6aeb393528a9456	2026-05-25 18:14:23.327034+05:30	20260525124423_init	\N	\N	2026-05-25 18:14:23.30646+05:30	1
2dd68d44-8a59-4c54-ba7d-7c9aeb48700e	524ef048ad9f9341d1bd7bc86bbfa9c66cb673e3ad0434d6c97d3d0548acb41d	2026-05-28 17:25:30.33512+05:30	20260528115530_add_new_column	\N	\N	2026-05-28 17:25:30.323786+05:30	1
5d7276e5-cf90-4d9c-9772-bc777f47822d	14b82ee80fc267da299117de819c609e43a2db6286f1fa3f6d58b60fd69e71f8	2026-05-28 17:55:44.411214+05:30	20260528122544_add_column	\N	\N	2026-05-28 17:55:44.402891+05:30	1
\.


--
-- Name: Files_id_seq; Type: SEQUENCE SET; Schema: public; Owner: madhav-jariwala
--

SELECT pg_catalog.setval('public."Files_id_seq"', 15, true);


--
-- Name: Folder_id_seq; Type: SEQUENCE SET; Schema: public; Owner: madhav-jariwala
--

SELECT pg_catalog.setval('public."Folder_id_seq"', 9, true);


--
-- Name: User_id_seq; Type: SEQUENCE SET; Schema: public; Owner: madhav-jariwala
--

SELECT pg_catalog.setval('public."User_id_seq"', 1, true);


--
-- PostgreSQL database dump complete
--

\unrestrict jwSYBr7h5KnrbwAjY4sSJedVCpyJaAUJj1fufWgKP2Athc8GMya33mBkJUwNXiY

