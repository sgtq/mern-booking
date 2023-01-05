import express from 'express';
import dotenv from 'dotenv';
import connect from './configs/db.js';
import cookieParser from 'cookie-parser';

import authRouter from './routes/auth.js';
import userRouter from './routes/users.js';
import hotelRouter from './routes/hotels.js';
import roomRouter from './routes/rooms.js';

const app = express();

dotenv.config();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
app.use(cookieParser())

// Routes
app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/hotels', hotelRouter);
app.use('/rooms', roomRouter);

// Error Handling
app.use((err, req, res, next) => {
	const errorStatus = err.status || 500;
	const errorMessage = err.message || 'Something went wrong!';
	return res.status(500).json({
		success: false,
		status: errorStatus,
		message: errorMessage,
		stack: err.stack
	});
});

app.listen(PORT, () => {
	connect();
	console.log(`Connected to backend on PORT: ${PORT}`)
});