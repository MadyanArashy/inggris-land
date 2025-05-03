import express from "express";
import cors from "cors";
import UserRoute from './routes/UserRoute.js';

const app = express();
const PORT = 5000;
app.use(cors());
app.use(express.json());
app.use(UserRoute);

app.listen(PORT, () => console.log(`App is running on http://localhost/${PORT}`));