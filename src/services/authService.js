// ──────────────────────────────────────────────────────────────────────────────
// MOCK AUTH SERVICE
// TODO: Replace with FastAPI → POST /api/auth/login | POST /api/auth/signup
// ──────────────────────────────────────────────────────────────────────────────

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

function delay(ms = 800) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const authService = {
  async login(email, password) {
    // TODO: POST /api/auth/login
    await delay(900);
    const user = MOCK_USERS.find(u => u.email === email && u.password === password);
    if (!user) throw new Error('Invalid email or password.');
    const { password: _, ...safeUser } = user;
    return safeUser;
  },

  async signup(name, email, password) {
    // TODO: POST /api/auth/signup
    await delay(1000);
    if (MOCK_USERS.find(u => u.email === email)) {
      throw new Error('An account with this email already exists.');
    }
    const newUser = { id: `u${Date.now()}`, name, email, role: 'user', avatar: null, createdAt: new Date().toISOString() };
    MOCK_USERS.push({ ...newUser, password });
    return newUser;
  },

  async googleSignIn() {
    // TODO: OAuth2 flow
    await delay(600);
    return MOCK_USERS[0];
  },
};

export default authService;
