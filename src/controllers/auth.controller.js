const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const emailService = require('../services/email.service');

const generateToken = (userId) => {
    return jwt.sign(
        { userId },
        process.env.JWT_SECRET,
        {
            expiresIn: '7d'
        }
    );
};
/**
 * Send Auth Cookie
 */
const sendCookie = (res, token) => {
    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000
    });
};

/**
 * Remove password from user object
 */
const sanitizeUser = (user) => {
    const userObj = user.toObject();
    delete userObj.password;
    return userObj;
};


/**
 * Register Controller
 * POST /api/auth/register
 */
async function userRegisterController(req, res) {
    try {
        const { email, name, password } = req.body;
        if (!email || !name || !password) {
            return res.status(400).json({
                status: 'fail',
                message: 'All fields are required'
            });
        }

        const isExist = await userModel.findOne({ email });

        if (isExist) {
            return res.status(409).json({
                status: 'fail',
                message: 'User already exists'
            });
        }
        const user = await userModel.create({
            email,
            name,
            password
        });

        const token = generateToken(user._id);

        sendCookie(res, token);

        await emailService.sendWelcomeEmail(user.email, user.name);
        const sanitizedUser = sanitizeUser(user);
        return res.status(201).json({
            status: 'success',
            message: 'User registered successfully',
            user: sanitizedUser
        });

    } catch (error) {
        console.log('Register Error:', error);
        return res.status(500).json({
            status: 'fail',
            message: error.message
        });
    }
}

/**
 * Login Controller
 * POST /api/auth/login
 */
async function userLoginController(req, res) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                status: 'fail',
                message: 'Email and password are required'
            });
        }

        const user = await userModel.findOne({ email }).select('+password');
        if (!user) {
            return res.status(404).json({
                status: 'fail',
                message: 'User not found'
            });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({
                status: 'fail',
                message: 'Invalid credentials'
            });
        }
        const token = generateToken(user._id);

        sendCookie(res, token);

        const sanitizedUser = sanitizeUser(user);

        return res.status(200).json({
            status: 'success',
            message: 'User logged in successfully',
            user: sanitizedUser
        });

    } catch (error) {
        console.log('Login Error:', error);
        return res.status(500).json({
            status: 'fail',
            message: error.message
        });
    }
}

/**
 * Logout Controller
 * POST /api/auth/logout
 */
async function userLogoutController(req, res) {
    try {
        res.clearCookie('token');
        return res.status(200).json({
            status: 'success',
            message: 'User logged out successfully'
        });
    } catch (error) {
        return res.status(500).json({
            status: 'fail',
            message: error.message
        });
    }
}
module.exports = {
    userRegisterController,
    userLoginController,
    userLogoutController
};