export interface IUser {
  id: string; // Typically the _id from MongoDB (converted to a string on the frontend)
  name: string;
  email: string;
  role: 'admin' | 'student' | 'teacher' | 'parent';
  profilePicture?: string; // Optional (if present)
  createdAt?: string; // Optional ISO date string
  updatedAt?: string; // Optional ISO date string
  courses?: string[]; // Array of course IDs (as strings)
  assignedCourses?: string[]; // Array of assigned course IDs (as strings)
  status?: 'active' | 'suspended'; // Optional, default is 'active'
}
