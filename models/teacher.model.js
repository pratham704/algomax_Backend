// teacher.model.js

export const TeacherSchema = {
    id: "INT AUTO_INCREMENT PRIMARY KEY",
    firstName: "VARCHAR(255) NOT NULL",
    lastName: "VARCHAR(255) NOT NULL",
    email: "VARCHAR(255) NOT NULL UNIQUE",
    password: 'VARCHAR(255) NOT NULL',

    subject: "VARCHAR(255) NOT NULL",
    dateOfJoining: "DATE NOT NULL",
    gender: "ENUM('Male', 'Female', 'Other') NOT NULL",
    createdAt: "TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
    updatedAt: "TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP",
};