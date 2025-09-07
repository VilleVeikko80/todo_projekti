# React + Vite

# Todo App (Fullstack-harjoitus)

Yksinkertainen harjoitusprojekti, jossa on **Node.js + Express** backend ja **React** frontend.  
Sovellus mahdollistaa käyttäjän rekisteröitymisen ja kirjautumisen sekä tehtävien lisäämisen ja poistamisen.

## 🔧 Teknologiat

- Backend: Node.js, Express, PostgreSQL, bcrypt, JWT
- Frontend: React, Vite, React Router, Axios

## 📂 Rakenne

project/

- server/ # Backend (Express + PostgreSQL)
- client/ # Frontend (React + Vite)

## 🗄️ Tietokanta

CREATE TABLE account (
id SERIAL PRIMARY KEY,
email TEXT UNIQUE NOT NULL,
password TEXT NOT NULL
);

CREATE TABLE task (
id SERIAL PRIMARY KEY,
description TEXT NOT NULL
);

## 🔑 Toiminnallisuus

Rekisteröityminen / kirjautuminen

POST /user/signup

POST /user/signin (palauttaa JWT-tokenin)

Tehtävät (Todos)

GET / → listaa tehtävät

POST /create → lisää uusi tehtävä

DELETE /delete/:id → poista tehtävä

Frontend käyttää näitä reittejä Axiosin kautta.

## 🖥️ Frontend kuvia

<img src="./projekti_kuvat/todo_sign_up.png" alt="Sign up" width="278" />
<img src="./projekti_kuvat/todo_sign_in.png" alt="Sign in" width="300" />
<img src="./projekti_kuvat/todos_list.png" alt="Sign in" width="368" />
