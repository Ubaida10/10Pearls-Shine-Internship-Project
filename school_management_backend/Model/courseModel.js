import mongoose, {Schema} from "mongoose";

const courseSchema = new Schema(
    {
        courseName: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        startDate: {
            type: Date,
            required: true,
        },
        endDate: {
            type: Date,
            required: true,
        },
        // Reference to the teacher for this course
        teacher: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        // List of students enrolled in the course
        students: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        }],
        assignments: [{
            title: {
                type: String,
                required: true,
            },
            description: {
                type: String,
                required: true,
            },
            dueDate: {
                type: Date,
                required: true,
            },
            // Array of student IDs who are assigned this assignment
            assignedTo: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true,
            }],
        }],
        category: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        updatedAt: {
            type: Date,
            default: Date.now,
        },
        status: {
            type: String,
            enum: ['active', 'completed', 'canceled'],
            default: 'active',
        },
    },
    { timestamps: true } // Automatically adds createdAt and updatedAt fields
);
const Course = mongoose.model('Courses', courseSchema);
export default Course;