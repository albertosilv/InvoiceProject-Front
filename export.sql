--
-- PostgreSQL database dump
--

-- Dumped from database version 16.1 (Debian 16.1-1.pgdg120+1)
-- Dumped by pg_dump version 16.1 (Debian 16.1-1.pgdg120+1)

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
-- Data for Name: __drizzle_migrations; Type: TABLE DATA; Schema: drizzle; Owner: postgres
--

INSERT INTO drizzle.__drizzle_migrations (id, hash, created_at) VALUES (1, '976495e2e8277ced2815a4236d3e810ca3e5a623980067f8d8b1cfd6971a793e', 1695980733259);
INSERT INTO drizzle.__drizzle_migrations (id, hash, created_at) VALUES (2, 'c190d518d320bc260e6538ebb049adae780278810f9f54fed945a17f57aaaafc', 1695981963327);
INSERT INTO drizzle.__drizzle_migrations (id, hash, created_at) VALUES (3, '2d112060388febbaeacf096fce32da588ee6267d65720a419b63bc6832f7e3f9', 1695987969414);
INSERT INTO drizzle.__drizzle_migrations (id, hash, created_at) VALUES (4, '36fb8b814448a0d0c82f66e433fc23cc98c90d762250ad08269073851beff029', 1696036047676);
INSERT INTO drizzle.__drizzle_migrations (id, hash, created_at) VALUES (5, 'c6870bece9049f2b21ec7a84751327af3081f65d3aca52144c16f54f6bcd62e6', 1710256401270);
INSERT INTO drizzle.__drizzle_migrations (id, hash, created_at) VALUES (6, '7536d0148cdc481a8d695197dce1d777b9df6d9b47ac509c890cc6351e8967eb', 1719942177619);
INSERT INTO drizzle.__drizzle_migrations (id, hash, created_at) VALUES (7, '1736d55e914f9e2175599e72941a655850651ec3947843542ede070eaae8e370', 1721408255977);
INSERT INTO drizzle.__drizzle_migrations (id, hash, created_at) VALUES (8, '982815878aa171e80771f0a85d5ff1656c73c0829c15985f5e4aa9cf58e63ac4', 1722022783170);
INSERT INTO drizzle.__drizzle_migrations (id, hash, created_at) VALUES (9, 'a0f86d1c180dbc352a82bda4eb1f6c5fed627161099ca1acc6a6aa8d1cb14722', 1723841738547);
INSERT INTO drizzle.__drizzle_migrations (id, hash, created_at) VALUES (10, '6bc331c6ecf41ca2ef43c7efe9230a6f0f3322c025e29b16bc35305f4fc21997', 1729693816951);
INSERT INTO drizzle.__drizzle_migrations (id, hash, created_at) VALUES (11, '4f366db091d931cabb035f89382d28bb5d2079bd13ba5c7b70d3d29f859fcf2a', 1730397072782);
INSERT INTO drizzle.__drizzle_migrations (id, hash, created_at) VALUES (12, '6113bbabb9b41cc7a467236eef7a35ab542a8be8874671a536e3e15220043e2a', 1732298836037);
INSERT INTO drizzle.__drizzle_migrations (id, hash, created_at) VALUES (13, '754b7c380b37e787b04be2db59f0aa380f8df8ee4f55c3f98df992cd6c5f1898', 1734725147471);
INSERT INTO drizzle.__drizzle_migrations (id, hash, created_at) VALUES (14, '53ea3b14112d1e84721679046debf1bf7d4ca41dd2edff5ac7b3c8129fd2b60a', 1735578027343);


--
-- Data for Name: access_tokens; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: accounts; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: authorization_parameters; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: consent_details; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.consent_details (id, consent_id, organisation_id, authorisation_server_id, tenant_id, api_family, created_at, updated_at, open_type, version, data) VALUES ('a5be62e4-28ad-45dc-87fa-2c0b46dea60e', 'urn:chubb:authorised-67890', 'opfi:98765432', 'auth-server-002', 'tenant-002', 'accounts', '2025-03-24 22:10:55.555009', '2025-03-24 22:10:55.555009', 'OPEN_DATA', '2.0', '{"status": "AWAITING_AUTHORISATION", "creationDateTime": "2023-02-20T14:45:00Z", "expirationDateTime": "2025-03-25T00:00:31.245956+00:00", "requestedPermissions": ["ACCOUNTS_READ"]}');
INSERT INTO public.consent_details (id, consent_id, organisation_id, authorisation_server_id, tenant_id, api_family, created_at, updated_at, open_type, version, data) VALUES ('cd1a4b6c-8d3e-4f5a-9b0c-1d2e3f4a5b6d', 'urn:chubb:authorised-67890', 'opfi:98765432', 'auth-server-002', 'tenant-002', 'accounts', '2025-03-24 22:10:55.555009', '2025-03-24 22:10:55.555009', 'OPEN_DATA', '2.0', '{"status": "AWAITING_AUTHORISATION", "creationDateTime": "2023-02-20T14:45:00Z", "expirationDateTime": "2025-12-31T23:59:59Z", "requestedPermissions": ["ACCOUNTS_READ"]}');
INSERT INTO public.consent_details (id, consent_id, organisation_id, authorisation_server_id, tenant_id, api_family, created_at, updated_at, open_type, version, data) VALUES ('ef2b5c7d-9e4f-5a6b-8c0d-2e3f4a5b6c7d', 'urn:chubb:authorised-55555', 'opfi:55556666', 'auth-server-003', 'tenant-003', 'payments', '2025-03-25 09:20:00', '2025-03-25 09:20:00', 'PISP', '1.5', '{"status": "AUTHORISED", "creationDateTime": "2025-03-25T09:15:00Z", "expirationDateTime": "2025-12-31T23:59:59Z", "requestedPermissions": ["PAYMENTS_INITIATE", "ACCOUNTS_READ"]}');
INSERT INTO public.consent_details (id, consent_id, organisation_id, authorisation_server_id, tenant_id, api_family, created_at, updated_at, open_type, version, data) VALUES ('gh3c6d8e-0f1a-6b7c-9d0e-3f4a5b6c7d8e', 'urn:chubb:authorised-11111', 'opfi:11112222', 'auth-server-001', 'tenant-001', 'customers', '2025-03-23 14:35:00', '2025-03-23 14:35:00', 'AISP', '1.2', '{"status": "REJECTED", "rejectionReason": "INVALID_SCOPE", "creationDateTime": "2025-03-23T14:30:00Z", "expirationDateTime": "2025-12-31T23:59:59Z", "requestedPermissions": ["CUSTOMERS_PERSONAL_IDENTITIES_READ"]}');
INSERT INTO public.consent_details (id, consent_id, organisation_id, authorisation_server_id, tenant_id, api_family, created_at, updated_at, open_type, version, data) VALUES ('ij4d7e9f-1a2b-7c8d-0e1f-4a5b6c7d8e9f', 'urn:chubb:authorised-33333', 'opfi:33334444', 'auth-server-004', 'tenant-004', 'accounts', '2025-03-26 11:50:00', '2025-03-26 11:50:00', 'OPEN_DATA', '2.1', '{"status": "EXPIRED", "creationDateTime": "2025-01-26T11:45:00Z", "expirationDateTime": "2025-12-31T23:59:59Z", "requestedPermissions": ["ACCOUNTS_READ", "ACCOUNTS_BALANCES_READ"]}');
INSERT INTO public.consent_details (id, consent_id, organisation_id, authorisation_server_id, tenant_id, api_family, created_at, updated_at, open_type, version, data) VALUES ('kl5e8f0a-2b3c-8d9e-1f0a-5b6c7d8e9f0a', 'urn:chubb:authorised-77777', 'opfi:77778888', 'auth-server-005', 'tenant-005', 'investments', '2025-03-22 08:25:00', '2025-03-22 08:25:00', 'CBPII', '1.8', '{"status": "AUTHORISED", "creationDateTime": "2025-03-22T08:20:00Z", "expirationDateTime": "2025-12-31T23:59:59Z", "requestedPermissions": ["INVESTMENTS_READ", "INVESTMENTS_ORDERS_CREATE"]}');


--
-- Data for Name: consents; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.consents (id, organisation_id, authorisation_server_id, created_at, updated_at, deleted_at, logged_user_cpf, status, business_entity_cnpj, additional_info) VALUES ('urn:chubb:authorised-55555', 'opfi:55556666', 'auth-server-003', '2025-03-25 09:15:22.123456', '2025-03-25 09:15:22.123456', NULL, '12345678900', 'AUTHORISED', '12345678000199', NULL);
INSERT INTO public.consents (id, organisation_id, authorisation_server_id, created_at, updated_at, deleted_at, logged_user_cpf, status, business_entity_cnpj, additional_info) VALUES ('urn:chubb:authorised-33333', 'opfi:33334444', 'auth-server-004', '2025-03-26 11:45:33.456789', '2025-03-26 11:45:33.456789', NULL, '44433322211', 'EXPIRED', '98765432000100', NULL);
INSERT INTO public.consents (id, organisation_id, authorisation_server_id, created_at, updated_at, deleted_at, logged_user_cpf, status, business_entity_cnpj, additional_info) VALUES ('urn:chubb:authorised-77777', 'opfi:77778888', 'auth-server-005', '2025-03-22 08:20:15.321654', '2025-03-22 08:20:15.321654', NULL, '99988877766', 'AUTHORISED', '45678912000134', NULL);
INSERT INTO public.consents (id, organisation_id, authorisation_server_id, created_at, updated_at, deleted_at, logged_user_cpf, status, business_entity_cnpj, additional_info) VALUES ('urn:chubb:authorised-67890', 'opfi:98765432', 'auth-server-002', '2025-03-24 22:10:48.751398', '2025-03-24 22:10:48.751398', NULL, '98765432109', 'AWAITING_AUTHORISATION', '49698955', NULL);
INSERT INTO public.consents (id, organisation_id, authorisation_server_id, created_at, updated_at, deleted_at, logged_user_cpf, status, business_entity_cnpj, additional_info) VALUES ('urn:chubb:authorised-67891', 'opfi:98765432', 'auth-server-002', '2025-03-24 22:10:48.751398', '2025-03-24 22:10:48.751398', NULL, '98765432109', 'AWAITING_AUTHORISATION', '71301687422', NULL);
INSERT INTO public.consents (id, organisation_id, authorisation_server_id, created_at, updated_at, deleted_at, logged_user_cpf, status, business_entity_cnpj, additional_info) VALUES ('urn:chubb:authorised-11111', 'opfi:11112222', 'auth-server-001', '2025-03-23 14:30:10.987654', '2025-03-23 14:30:10.987654', NULL, '55566677789', 'REJECTED', '16033422', NULL);


--
-- Data for Name: enrollments; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: organisations; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: payments; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: registered_redirect_uris; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Name: __drizzle_migrations_id_seq; Type: SEQUENCE SET; Schema: drizzle; Owner: postgres
--

SELECT pg_catalog.setval('drizzle.__drizzle_migrations_id_seq', 14, true);


--
-- Name: access_tokens_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.access_tokens_id_seq', 1, false);


--
-- Name: authorization_parameters_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.authorization_parameters_id_seq', 1, false);


--
-- Name: registered_redirect_uris_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.registered_redirect_uris_id_seq', 1, false);


--
-- PostgreSQL database dump complete
--

