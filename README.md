# School Management System

## Overview
The School Management System is a web application developed using the MEAN stack (MongoDB, Express.js, Angular, and Node.js). It is designed to streamline the management of school operations, such as student enrollment, teacher assignments, class schedules, and more. The project structure is divided into two main folders:

- **Backend**: Handles server-side logic, APIs, and database management.
- **Frontend**: Manages the client-side interface and user experience.

---

## Features
- Student and teacher management
- Courses handling
- User authentication and role-based access control
- Dashboard

---

## Project Structure
```
School-Management-System/
|
|-- Backend/        # Server-side folder
|   |-- config/     # Configuration files
|   |-- Controller/ # API controllers
|   |-- Model/     # Database schemas
|   |-- Routes/     # API routes
|   |-- app.js      # Main server file
|   |-- package.json # Backend dependencies
|
|-- Frontend/       # Client-side folder
    |-- public/
        |-- assets/
|   |-- src/        # Angular source code
|       |-- app/    # Components and services
|       |-- assets/ # Static assets
|       |-- environments/ # Environment-specific configurations
|   |-- angular.json # Angular configuration file
|   |-- package.json # Frontend dependencies
|
|-- README.md       # Project documentation
```

---

## Prerequisites
To run this project locally, ensure you have the following installed:

- **Node.js** (v21 or higher)
- **MongoDB** (v4 or higher)
- **Angular CLI** (v19 or higher)

---

## Setup Instructions

### Backend
1. Navigate to the `Backend` folder:
   ```bash
   cd Backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up the environment variables by creating a `.env` file:
   ```env
   PORT=3000
   DB_URI=mongodb://localhost:27017/school-management
   JWT_SECRET=your_secret_key
   ```
4. Start the server:
   ```bash
   nodemon .\server.js
   ```

### Frontend
1. Navigate to the `Frontend` folder:
   ```bash
   cd Frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   ng serve
   ```
4. Access the application in your browser at `http://localhost:4200`.

---

## Technologies Used

### Frontend:
- **Angular**: Framework for building dynamic web applications
- **Tailwind CSS**: For UI structure and styling
- **TypeScript**: For writing scalable and maintainable code

### Backend:
- **Node.js**: Server-side runtime
- **Express.js**: Web framework for building APIs
- **MongoDB**: NoSQL database for data storage
- **Mongoose**: ODM library for MongoDB

---

## Contributing
1. Fork the repository.
2. Create a new branch for your feature/bugfix:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature-name"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Submit a pull request.

---

## License
This project is licensed under the MIT License.

---

## Contact
For any queries or support, you can email me.

