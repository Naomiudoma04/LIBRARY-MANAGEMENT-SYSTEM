# Library Management System

## Project Description
The Library Management System is a backend application built with Node.js, Express.js, Sequelize ORM, and MySQL. It helps manage books, categories, library members, and borrowing records.

## Technologies Used
- Node.js
- Express.js
- Sequelize ORM
- MySQL
- Postman
- Git and GitHub

## Features
- Create and manage book categories.
- Create, view, update, and delete books.
- Register and manage library members.
- Borrow books.
- View all borrowing records.
- View a borrowing record by ID.
- Update borrowing status.
- Return borrowed books.
- Update available book copies when books are borrowed or returned.
- View the borrowing history of a library member.
- Validate borrowing details and borrowing status.

## Project Installation

1. Clone the repository.
2. Open the project folder in VS Code.
3. Install the project dependencies:

```bash
npm install
```

4. Create a `.env` file in the project root directory.
5. Add your database configuration to the `.env` file.

Example:

```env
PORT=1234
DBHOST=your_database_host
DBUSER=your_database_username
DBPASSWORD=your_database_password
DBNAME=your_database_name
DBPORT=your_database_port
```

Do not upload your real database password or `.env` file to GitHub.

## Running the Project

Start the server using:

```bash
npm start
```

If your project uses Nodemon, you can also run:

```bash
npm run dev
```

## API Testing

The API endpoints can be tested using Postman.

Main routes:

- `/members` - Library member routes.
- `/api/borrowing` - Borrowing routes.

## Borrowing Validation

The application checks that:
- Required borrowing details are provided.
- The book exists.
- The library member exists.
- The book has available copies.
- The due date is valid and in the future.
- Borrowing status is one of the allowed values: Borrowed, Returned, or Overdue.

## Borrowing History

The system allows users to retrieve all borrowing records and associated book details for a particular library member.

## Author
Ugonna Chidubem

## Project Status
Under development.
