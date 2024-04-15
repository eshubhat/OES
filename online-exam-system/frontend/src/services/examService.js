import axios from 'axios';

const baseURL = 'http://localhost:5000/api';

const examService = {
  getExamById: async (examId) => {
    try {
      const response = await axios.get(`${baseURL}/exams/${examId}`);
      return response.data.exam;
    } catch (error) {
      console.error('Failed to fetch exam:', error);
      throw error;
    }
  },

  submitExamAnswers: async (examId, answers) => {
    try {
      const response = await axios.post(`${baseURL}/exam-attempts/${examId}/submit`, { answers });
      return response.data;
    } catch (error) {
      console.error('Failed to submit exam:', error);
      throw error;
    }
  }
};

export default examService;
