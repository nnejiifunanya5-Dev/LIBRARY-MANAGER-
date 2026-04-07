# Library Management API

A RESTful API for managing **books, authors, students, and library attendants** in a library system.  
Built with **Node.js**, **Express**, and **MongoDB**, following the **MVC pattern**.

---

## Table of Contents

- [Project Description](#project-description)  
- [Setup Instructions](#setup-instructions)  
- [Project Structure](#project-structure)  
- [API Documentation](#api-documentation)  
  - [Authors](#authors)  
  - [Students](#students)  
  - [Books](#books)  
  - [Attendants](#attendants)  
- [Technologies Used](#technologies-used)

---

## Project Description

This project provides a backend API for a library system, allowing users to:

- Add, update, delete, and view **authors**  
- Add, update, delete, and view **students**  
- Add, borrow, return, and delete **books**  
- Manage **library attendants**  
- Track borrowed books and overdue books  

It follows the **MVC pattern** to keep models, controllers, and routes organized.

---

## Setup Instructions

1. **Clone the repository:**

```bash
git clone https://github.com/nnejiifunanya5-Dev/LIBRARY-MANAGER-.git

LIBRARYMANAGER/
│
├── models/         # Database schemas (Books, Authors, Students, Attendants)
├── controllers/    # Business logic for each resource
├── routes/         # Express routes for each resource
├── middleware/     # Authentication & validation
├── config/         # Database connection
├── .env            # Environment variables
└── server.js       # Entry point of the application


AUTHOR ENDPOINTS
| Method | Endpoint         | Description         |
| ------ | ---------------- | ------------------- |
| GET    | /api/authors     | Get all authors     |
| GET    | /api/authors/:id | Get author by ID    |
| POST   | /api/authors     | Create a new author |
| PUT    | /api/authors/:id | Update author by ID |
| DELETE | /api/authors/:id | Delete author by ID |


STUDENT ENDPOINTS
| Method | Endpoint          | Description          |
| ------ | ----------------- | -------------------- |
| GET    | /api/students     | Get all students     |
| GET    | /api/students/:id | Get student by ID    |
| POST   | /api/students     | Create a new student |
| PUT    | /api/students/:id | Update student by ID |
| DELETE | /api/students/:id | Delete student by ID |


BOOK ENDPOINTS
| Method | Endpoint               | Description            |
| ------ | ---------------------- | ---------------------- |
| GET    | /api/books             | Get all books          |
| GET    | /api/books/:id         | Get book by ID         |
| POST   | /api/books/book        | Create a new book      |
| POST   | /api/books/:id/borrow  | Borrow a book          |
| POST   | /api/books/:id/return  | Return a borrowed book |
| DELETE | /api/books/:id         | Delete a book          |
| GET    | /api/books/overdue/all | Get all overdue books  |


ATTENDANT ENDPOINTS
| Method | Endpoint            | Description            |
| ------ | ------------------- | ---------------------- |
| GET    | /api/attendants     | Get all attendants     |
| GET    | /api/attendants/:id | Get attendant by ID    |
| POST   | /api/attendants     | Create a new attendant |
| PUT    | /api/attendants/:id | Update attendant by ID |
| DELETE | /api/attendants/:id | Delete attendant by ID |



TECHNOLOGIES USED
Node.js
Express.js
MongoDB & Mongoose
Git & GitHub


NOTES
All routes accept JSON requests.
Use tools like Postman to test the API.
Follow the MVC structure for clean and maintainable code.