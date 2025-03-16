import axios from 'axios';

const API_URL = "http://127.0.0.1:8000/api/";

export const fetchStudyGroups = async () => {
    try {
        const response = await axios.get(`${API_URL}groups/`);
        return response.data;
    } catch (error) {
        console.error("Error fetching study groups", error);
        return [];
    }
};
 