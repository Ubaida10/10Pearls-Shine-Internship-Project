import User from '../Model/userModel.js';  // Assuming User model is imported correctly
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Course from "../Model/courseModel.js";  // Import mongoose for ObjectId validation



export const login = async(req,res)=>{
    const {email,password} = req.body;

    try{
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        const isMatch = await bcrypt.compare(password,user.password);
        console.log(isMatch)
        if(!isMatch){
            return res.status(400).json({message:"Invalid credentials"});
        }
        const token = jwt.sign({userId:user._id},process.env.JWT_SECRET);
        res.status(200).json({token});
    }catch(error) {
        // If an error occurs, respond with status 500 and the error message
        res.status(500).json({ message: error.message });
    }
};



export const register = async (req, res) => {
    const { name, email, password, role, profilePicture } = req.body; // Use req.body instead of req.params

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password using bcrypt
        const hashPassword = await bcrypt.hash(password, 10);

        // Create the user in the database
        const user = await User.create({
            name,
            email,
            password: hashPassword,
            role,
            profilePicture,
        });

        // Return the created user (you can modify this to exclude sensitive data like the password)
        return res.status(200).json({ user });
    } catch (error) {
        // If an error occurs, respond with status 500 and the error message
        return res.status(500).json({ message: error.message });
    }
};



export const enrollInCourse = async (req, res) => {
    const { courseId, userId } = req.body;
    console.log('Request received with courseId:', courseId, 'and userId:', userId);

    try {
        // Find the user and the course in the database
        const user = await User.findById(userId);
        console.log('User found:', user);
        const course = await Course.findById(courseId);
        console.log('Course found:', course);

        if (!user || !course) {
            console.log('User or course not found');
            return res.status(404).json({ message: 'User or course not found' });
        }

        // Check if the user is already enrolled in the course
        if (course.students.includes(user._id)) {
            console.log('User already enrolled in the course');
            return res.status(400).json({ message: 'User already enrolled in the course' });
        }

        // Add the user to the course's enrolledUsers array
        console.log('Enrolling user...');
        course.students.push(user._id);
        await course.save();

        // Add the course to the user's assignedCourses array
        user.courses.push(course._id);
        await user.save();

        console.log('User successfully enrolled in the course');
        return res.status(200).json({
            message: 'User successfully enrolled in the course',
            course,
        });
    } catch (error) {
        console.error('Error occurred:', error.message);
        return res.status(500).json({ message: error.message });
    }
};



export const getUserCourses = async (req, res) => {
    try {
        const { userId } = req.query;  // Correctly access userId from the query params

        // Fetch the user and populate the courses array
        const user = await User.findById(userId).populate('courses').exec();

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Return the populated courses
        return res.status(200).json({ courses: user.courses });
    } catch (error) {
        console.error('Error fetching user courses:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


export const getUserById = async (req, res) => {
    try {
        const { userId } = req.query;  // Correctly access userId from the request parameters
        console.log('userId:', userId);
        // Fetch the user
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Return the user
        return res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

