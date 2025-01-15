import mongoose, {Schema} from "mongoose";

//const mongoose = require('mongoose');

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, 'Please enter a valid email address'],
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ['admin', 'student', 'teacher', 'parent'],
            required: true,
        },
        /*dateOfBirth: {
            type: Date,
            required: false,
        },*/
        /*phoneNumber: {
            type: String,
            required: false,
        },*/
        /*address: {
            type: String,
            required: false,
        },*/
        profilePicture: {
            type: String,
            required: false, // URL or file path to profile picture
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        updatedAt: {
            type: Date,
            default: Date.now,
        },
        // Reference to courses the user is enrolled in (for students) or teaching (for teachers)
        courses: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Courses',
        }],
        // Reference to courses the user is teaching (for teachers)
        assignedCourses: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course',
        }],
        status: {
            type: String,
            enum: ['active', 'suspended'],
            default: 'active',
        },
    },
    { timestamps: true } // Automatically adds createdAt and updatedAt fields
);
const User = mongoose.model('Users', userSchema);
export default  User;