import Course from '../Model/courseModel.js';  // Use ES module import for consistency


export const createCourse = async (req, res) => {
    try {
        // Create a new course using the data from the request body
        const course = await Course.create(req.body);
        res.status(200).json(course);  // Respond with status 200 and the created course
    } catch (error) {
        // If an error occurs, respond with status 500 and the error message
        res.status(500).json({ message: error.message });
    }
};

export const getCourses = async (req, res) => {
    try {
        const courses = await Course.find({});  // Retrieve all courses
        res.status(200).json(courses);  // Respond with status 200 and the list of courses
    } catch (error) {
        // If an error occurs, respond with status 500 and the error message
        res.status(500).json({ message: error.message });
    }
};

export const getCourseById = async (req, res) => {
    try {
        const { id } = req.params;  // Extract course ID from request parameters
        const course = await Course.findById(id);  // Find the course by ID

        if (!course) {
            return res.status(404).json({ message: 'Course not found' });  // Handle if course is not found
        }

        res.status(200).json(course);  // Respond with status 200 and the course details
    } catch (error) {
        // If an error occurs, respond with status 500 and the error message
        res.status(500).json({ message: error.message });
    }
};

export const updateCourse = async (req, res) => {
    try {
        const { id } = req.params;  // Extract course ID from request parameters
        const course = await Course.findByIdAndUpdate(id, req.body, { new: true });  // Update the course and return the updated document

        if (!course) {
            return res.status(404).json({ message: 'Course not found' });  // Handle if course does not exist
        }

        res.status(200).json(course);  // Respond with the updated course
    } catch (error) {
        // If an error occurs, respond with status 500 and the error message
        res.status(500).json({ message: error.message });
    }
};

export const deleteCourse = async (req, res) => {
    try {
        const { id } = req.params;  // Extract course ID from request parameters
        const course = await Course.findByIdAndDelete(id);  // Find and delete the course by ID

        if (!course) {
            return res.status(400).json({ message: 'Course not found' });  // Handle if course does not exist
        }

        res.status(200).json({ message: 'Course successfully deleted.' });  // Respond with success message
    } catch (error) {
        // If an error occurs, respond with status 500 and the error message
        res.status(500).json({ message: error.message });
    }
};
