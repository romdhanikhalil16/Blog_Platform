const jwt = require('jsonwebtoken');
const User = require('../models/User');

const createAccessToken = (user) =>
    jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '15m' });

const createRefreshToken = (user) =>
    jwt.sign({ id: user._id }, process.env.REFRESH_SECRET, { expiresIn: '7d' });

exports.register = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;
        const user = await User.create({ username, email, password, role });
        res.status(201).json({ message: 'User created' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password)))
            return res.status(401).json({ error: 'Invalid credentials' });

        const accessToken = createAccessToken(user);
        const refreshToken = createRefreshToken(user);

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: false, // set true in production
            sameSite: 'strict',
        });

        res.json({ accessToken, role: user.role });
    } catch (err) {
        res.status(500).json({ error: 'Login failed' });
    }
};
