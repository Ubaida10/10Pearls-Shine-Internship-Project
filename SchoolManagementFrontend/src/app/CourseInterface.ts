export interface Course {
  _id: string;
  courseName: string;
  description: string;
  startDate: Date;
  endDate: Date;
  teacher: {
    _id: string;
    name: string;
    email?: string;
  };
  students: Array<{
    _id: string;
    name: string;
    email?: string;
  }>;
  assignments: Array<{
    title: string;
    description: string;
    dueDate: Date;
    assignedTo: Array<{
      _id: string;
      name: string;
      email?: string;
    }>;
  }>;
  category: string;
  status: 'active' | 'completed' | 'canceled';
  createdAt: Date;
  updatedAt: Date;
}

export default Course
