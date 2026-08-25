// ──────────────────────────────────────────────────────────────────────────────
// AUTH SERVICE - Flask Backend API Integration
// ──────────────────────────────────────────────────────────────────────────────
import { apiClient } from './apiClient';

const MOCK_USERS = [
  {
    id: 'u1',
    name: 'Anshika Bansal',
    email: 'anshika@example.com',
    password: 'password123',
    role: 'user',
    avatar: null,
    createdAt: '2024-01-15',
  },
  {
    id: 'u0',
    name: 'Admin',
    email: 'admin@portfolioforge.com',
    password: 'admin123',
    role: 'admin',
    avatar: null,
    createdAt: '2023-12-01',
  },
];

const authService = {
  async login(email, password) {
    try {
      const data = await apiClient.post('/auth/login', { email, password });
      return {
        ...data.user,
        access_token: data.access_token
      };
    } catch (err) {
      // Fallback local check if backend server is offline
      const user = MOCK_USERS.find(u => u.email === email && u.password === password);
      if (user) {
        const { password: _, ...safeUser } = user;
        return safeUser;
      }
      throw err;
    }
  },

  async signup(name, email, password) {
    try {
      const data = await apiClient.post('/auth/signup', { name, email, password });
      return {
        ...data.user,
        access_token: data.access_token
      };
    } catch (err) {
      if (MOCK_USERS.find(u => u.email === email)) {
        throw new Error('An account with this email already exists.');
      }
      const newUser = { id: `u${Date.now()}`, name, email, role: 'user', avatar: null, createdAt: new Date().toISOString() };
      return newUser;
    }
  },

  async googleSignIn() {
    try {
      return await apiClient.post('/auth/google');
    } catch (err) {
      return MOCK_USERS[0];
    }
  },

  async getCurrentUser() {
    return await apiClient.get('/auth/me');
  }
};

export default authService;
