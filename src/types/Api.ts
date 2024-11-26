import axios from 'axios';

const API_URL = 'http://localhost:5173'; // Sesuaikan dengan URL backend Anda

export const deleteBook = async (bookId: string) => {
  try {
    const response = await axios.delete(`${API_URL}/book/${bookId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting book:', error);
    throw error;
  }
};
