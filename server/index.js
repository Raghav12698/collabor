// Importing necessary dependencies
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/dbconfig.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';

// Importing routes
import authRoute from './routes/authRoute.js';

// Configuring dotenv path
dotenv.config({
    path: './.env'
});

// Defining PORT and corsOrigin
const PORT = process.env.PORT || 8800; // Fallback to 8800 if PORT is not defined
const corsOrigins = process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : ['http://localhost:5174']; // Fallback to default origin if CORS_ORIGIN is not defined
// Creating an express app
const app = express();
const httpServer = http.createServer(app);

// Configuring Socket.IO
const io = new Server(httpServer, {
    cors: {
        origin: corsOrigins, // Allow connections from specified origins
        methods: ['GET', 'POST'], // Allowed HTTP methods
    },
});

// Setting corsOptions
const corsOptions = {
    origin: corsOrigins,
    credentials: true,
};

// Configuring app middlewares
app.use(cors(corsOptions)); // Use corsOptions consistently
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(cookieParser());

// Defining routes
app.use('/api/auth', authRoute);

// Root route
app.get('/', (req, res) => {
    console.log('Root route accessed');
    res.status(201).send('Hi, from index.js! Your server is running successfully.');
});

// Socket.IO connection handling
let connections = [];

io.on('connection', (socket) => {
    connections.push(socket);
    console.log(`New user connected: ${socket.id}`);

    socket.on('createRoom', ({ roomName }) => {
        console.log(`${socket.id} created room: ${roomName}`);
        socket.join(roomName);
    });

    socket.on('disconnect', (reason) => {
        connections = connections.filter((con) => con.id !== socket.id);
        console.log(`User disconnected: ${socket.id}, Reason: ${reason}`);
    });
});

// Connecting database and starting server
connectDB()
    .then(() => {
        httpServer.listen(PORT, () => {
            console.log(`⚙️ Server is running at port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log('Error starting the server:', error);
    });     
    