import express from "express";
import cors from "cors";
import session from "express-session";
import bodyParser from "body-parser";
import UserRoute from './routes/UserRoute.js';
import authRoutes from "./routes/Auth.js";


const app = express();
const PORT = 5000;

app.use(cors({
  origin: 'http://localhost:5173', // your React app URL
  credentials: true
}));


app.use(bodyParser.json());
app.use(express.json());
app.use(session({
  secret: 'your-secret-key',      // Key rahasia penting supaya tidak mudah di hack
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,                // security http atau https
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 30      // total hidup session 30 hari
  }
}));

app.use(UserRoute);
app.use("/auth", authRoutes);

app.listen(PORT, () => console.log(`App is running on http://localhost/${PORT}`));