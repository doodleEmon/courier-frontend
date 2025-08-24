import { BASE_URL } from '@/constants';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk for user login
export const loginUser = createAsyncThunk(
  "auth/login",
  async (userData: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${BASE_URL}/auth/login`, userData);
      return data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Something went wrong");
    }
  }
);

// Thunk for user registration
export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData: { name: string; email: string; phone: string; password: string; role: string }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${BASE_URL}/auth/register`, userData);
      return data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Something went wrong");
    }
  }
);