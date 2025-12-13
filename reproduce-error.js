
import axios from 'axios';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), 'api/.env') });

const API_URL = 'http://localhost:5000/api';

async function reproduce() {
  try {
    // 1. Login as artist
    console.log('Logging in as artist...');
    const loginRes = await axios.post(`${API_URL}/auth/login`, {
      email: 'artist1@example.com',
      password: 'artist123' 
    });
    
    const token = loginRes.data.token;
    console.log('Login successful, token obtained.');

    // 2. Fetch bookings
    console.log('Fetching bookings...');
    try {
      const bookingsRes = await axios.get(`${API_URL}/artists/bookings`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('Bookings fetched successfully:', bookingsRes.data);
    } catch (err) {
      console.error('Error fetching bookings:');
      if (err.response) {
        console.error('Status:', err.response.status);
        console.error('Data:', JSON.stringify(err.response.data, null, 2));
      } else {
        console.error(err.message);
      }
    }

  } catch (error) {
    console.error('Login failed:', error.message);
    if (error.response) {
        console.error('Login Error Data:', error.response.data);
    }
  }
}

reproduce();
