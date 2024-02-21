import axios from 'axios';

import User from '../models/UserRepresentation'; // Adjust the path based on your project structure

const API_BASE_URL = 'http://localhost:3000/api';

export const UserApiService = {
    getAllUsers: async (): Promise<User[]> => {
        try {
            const response = await axios.get<User[]>(`${API_BASE_URL}/user`);
            return response.data;
        } catch (error) {
            console.error('Error fetching users:', error);
            throw error;
        }
    },

    createUser: async (userData: User): Promise<User> => {
        try {
            const response = await axios.post<User>(`${API_BASE_URL}/user`, userData);
            return response.data;
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    },

    updateUser: async (userId: number, userData: User): Promise<User> => {
        try {
            const response = await axios.put<User>(`${API_BASE_URL}/user/${userId}`, userData);
            return response.data;
        } catch (error) {
            console.error('Error updating user:', error);
            throw error;
        }
    },

    deleteUser: async (userId: number): Promise<void> => {
        try {
            await axios.delete(`${API_BASE_URL}/user/${userId}`);
        } catch (error) {
            console.error('Error deleting user:', error);
            throw error;
        }
    },

    getUserById: async (userId: number): Promise<User> => {
        try {
            const response = await axios.get<User>(`${API_BASE_URL}/user/${userId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching user by ID:', error);
            throw error;
        }
    },
};
