import { BASE_URL } from '@/constants';
import { createAsyncThunk } from '@reduxjs/toolkit';

// Thunk for user login
export const loginUser = createAsyncThunk(
  "auth/login",
  async (userData: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (err: any) {
      return rejectWithValue(err.message || "Something went wrong");
    }
  }
);

// Thunk for user registration
export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData: { name: string; email: string; phone: string; password: string; role: string }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (err: any) {
      return rejectWithValue(err.message || "Something went wrong");
    }
  }
);