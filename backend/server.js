require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const http = require('http');

const app = express();
const server = http.createServer(app);


// Middlewares
app.use(cors({ origin: 'http://localhost:4200', credentials: true }));
app.use(express.json());
app.use(cookieParser());

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const articleRoutes = require('./routes/articles');
app.use('/api/articles', articleRoutes);

const commentRoutes = require('./routes/comments');
app.use('/api/comments', commentRoutes);


//Socket.io
const { Server } = require('socket.io');
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:4200',
        credentials: true
    }
});

// Socket.IO listeners
io.on('connection', (socket) => {
    console.log('Client connected');

    socket.on('joinArticle', (articleId) => {
        socket.join(articleId);
    });

    socket.on('newComment', (comment) => {
        io.to(comment.article).emit('commentAdded', comment);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

app.set('io', io); // So you can use it inside controllers


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error(err));

// Routes
app.get('/', (req, res) => res.send('API Running'));


// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
