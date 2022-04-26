--
-- PostgreSQL database dump
--

-- Dumped from database version 14.1
-- Dumped by pg_dump version 14.1

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
-- Name: check_attendance; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.check_attendance AS ENUM (
    'come',
    'notcome',
    'late'
);


ALTER TYPE public.check_attendance OWNER TO postgres;

--
-- Name: gender; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.gender AS ENUM (
    'male',
    'female'
);


ALTER TYPE public.gender OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: auth; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.auth (
    username character varying(255) NOT NULL,
    password character varying(255)
);


ALTER TABLE public.auth OWNER TO postgres;

--
-- Name: class; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.class (
    class_id character varying(255) NOT NULL,
    subject_id character varying(255)
);


ALTER TABLE public.class OWNER TO postgres;

--
-- Name: class_attendance; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.class_attendance (
    attendance_id integer NOT NULL,
    class_id character varying(255),
    attendance_name character varying(255)
);


ALTER TABLE public.class_attendance OWNER TO postgres;

--
-- Name: class_attendance_attendance_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.class_attendance_attendance_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.class_attendance_attendance_id_seq OWNER TO postgres;

--
-- Name: class_attendance_attendance_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.class_attendance_attendance_id_seq OWNED BY public.class_attendance.attendance_id;


--
-- Name: class_score; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.class_score (
    score_id integer NOT NULL,
    class_id character varying(255),
    score_name character varying(255),
    max_score double precision,
    unit_score double precision
);


ALTER TABLE public.class_score OWNER TO postgres;

--
-- Name: class_student; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.class_student (
    class_id character varying(255),
    student_id character varying(255),
    student_status boolean DEFAULT true
);


ALTER TABLE public.class_student OWNER TO postgres;

--
-- Name: student; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.student (
    student_id character varying(255) NOT NULL,
    student_firstname character varying(255),
    student_lastname character varying(255),
    student_status boolean DEFAULT true,
    gender public.gender
);


ALTER TABLE public.student OWNER TO postgres;

--
-- Name: student_attendance; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.student_attendance (
    attendance_id integer,
    student_id character varying(255),
    attendance_status public.check_attendance
);


ALTER TABLE public.student_attendance OWNER TO postgres;

--
-- Name: student_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.student_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.student_id_seq OWNER TO postgres;

--
-- Name: student_score; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.student_score (
    score_id integer,
    student_id character varying(255),
    score_point double precision
);


ALTER TABLE public.student_score OWNER TO postgres;

--
-- Name: student_score_score_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.student_score_score_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.student_score_score_id_seq OWNER TO postgres;

--
-- Name: student_score_score_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.student_score_score_id_seq OWNED BY public.class_score.score_id;


--
-- Name: subject; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.subject (
    subject_id character varying(255) NOT NULL,
    subject_name character varying(255),
    teacher_id character varying(255)
);


ALTER TABLE public.subject OWNER TO postgres;

--
-- Name: teacher; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.teacher (
    teacher_id character varying(255) NOT NULL,
    teacher_firstname character varying(255),
    teacher_lastname character varying(255)
);


ALTER TABLE public.teacher OWNER TO postgres;

--
-- Name: test; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.test (
    id integer NOT NULL,
    name integer
);


ALTER TABLE public.test OWNER TO postgres;

--
-- Name: test_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.test_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.test_id_seq OWNER TO postgres;

--
-- Name: test_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.test_id_seq OWNED BY public.test.id;


--
-- Name: class_attendance attendance_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.class_attendance ALTER COLUMN attendance_id SET DEFAULT nextval('public.class_attendance_attendance_id_seq'::regclass);


--
-- Name: class_score score_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.class_score ALTER COLUMN score_id SET DEFAULT nextval('public.student_score_score_id_seq'::regclass);


--
-- Name: test id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.test ALTER COLUMN id SET DEFAULT nextval('public.test_id_seq'::regclass);


--
-- Name: auth auth_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth
    ADD CONSTRAINT auth_pkey PRIMARY KEY (username);


--
-- Name: class_attendance class_attendance_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.class_attendance
    ADD CONSTRAINT class_attendance_pkey PRIMARY KEY (attendance_id);


--
-- Name: class class_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.class
    ADD CONSTRAINT class_pkey PRIMARY KEY (class_id);


--
-- Name: class_score student_score_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.class_score
    ADD CONSTRAINT student_score_pkey PRIMARY KEY (score_id);


--
-- Name: student students_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.student
    ADD CONSTRAINT students_pkey PRIMARY KEY (student_id);


--
-- Name: subject subjects_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subject
    ADD CONSTRAINT subjects_pkey PRIMARY KEY (subject_id);


--
-- Name: teacher teachers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.teacher
    ADD CONSTRAINT teachers_pkey PRIMARY KEY (teacher_id);


--
-- Name: subject unique_subject_id; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subject
    ADD CONSTRAINT unique_subject_id UNIQUE (subject_id);


--
-- Name: student_attendance fk_attendance_pk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.student_attendance
    ADD CONSTRAINT fk_attendance_pk FOREIGN KEY (attendance_id) REFERENCES public.class_attendance(attendance_id);


--
-- Name: class_attendance fk_class_attendance; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.class_attendance
    ADD CONSTRAINT fk_class_attendance FOREIGN KEY (class_id) REFERENCES public.class(class_id);


--
-- Name: class_student fk_class_student_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.class_student
    ADD CONSTRAINT fk_class_student_id FOREIGN KEY (class_id) REFERENCES public.class(class_id);


--
-- Name: class_student fk_class_student_stid; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.class_student
    ADD CONSTRAINT fk_class_student_stid FOREIGN KEY (student_id) REFERENCES public.student(student_id);


--
-- Name: class_score fk_score_class; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.class_score
    ADD CONSTRAINT fk_score_class FOREIGN KEY (class_id) REFERENCES public.class(class_id);


--
-- Name: student_score fk_score_pk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.student_score
    ADD CONSTRAINT fk_score_pk FOREIGN KEY (score_id) REFERENCES public.class_score(score_id);


--
-- Name: student_attendance fk_student_attendance; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.student_attendance
    ADD CONSTRAINT fk_student_attendance FOREIGN KEY (student_id) REFERENCES public.student(student_id);


--
-- Name: student_score fk_student_attendance; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.student_score
    ADD CONSTRAINT fk_student_attendance FOREIGN KEY (student_id) REFERENCES public.student(student_id);


--
-- Name: class fk_subject_class; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.class
    ADD CONSTRAINT fk_subject_class FOREIGN KEY (subject_id) REFERENCES public.subject(subject_id);


--
-- Name: subject fk_subject_teacher; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subject
    ADD CONSTRAINT fk_subject_teacher FOREIGN KEY (teacher_id) REFERENCES public.teacher(teacher_id);


--
-- PostgreSQL database dump complete
--

