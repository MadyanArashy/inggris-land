import express from 'express';
import cors from 'cors';
import session from 'express-session';
import bodyParser from 'body-parser';
import UserRoute from './routes/UserRoutes.js';
import authRoutes from './routes/Auth.js';
import groupRoutes from './routes/GroupRoutes.js';
import questionRoutes from './routes/QuestionRoutes.js';
import completionRoutes from './routes/CompletionRoutes.js';
import answerRoutes from './routes/AnswerRoutes.js';

const app = express();
const PORT = 5000;

// CORS Configuration: Allow frontend (React) at http://localhost:5173
app.use(
  cors({
    origin: 'http://localhost:5173', // React app URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow necessary HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
    credentials: true, // Include cookies in requests (for sessions)
  })
);

// Body parser middleware
app.use(bodyParser.json());
app.use(express.json());

// Session middleware
app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // Change to true if you're using HTTPS
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days session duration
    },
  })
);

// Logout
app.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ message: 'Logout failed' });
    }
    res.clearCookie('connect.sid'); // Default session cookie name
    res.status(200).json({ message: 'Logged out successfully' });
  });
});


// Routes
app.use(UserRoute);
app.use('/auth', authRoutes);

app.use('/api', groupRoutes);
app.use('/api', questionRoutes);
app.use('/api', completionRoutes);
app.use('/api', answerRoutes);

// Start server
app.listen(PORT, () => console.log(`App is running on http://localhost:${PORT}`));
