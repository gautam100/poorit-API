const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');
const { hashPassword, comparePassword } = require('../utils/passwordUtils');
const config = require('../config/config');

const signup = async (req, res) => {
    try {
        const { name, email, password, mobile, gender, organization } = req.body;

        const existingUser = await UserModel.findByEmail(email);
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User already exists with this email'
            });
        }

        const hashedPassword = await hashPassword(password);
        const newUser = await UserModel.create({
            name,
            email,
            password: hashedPassword,
            mobile,
            gender,
            organization
        });

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            user: newUser
        });
    } catch (error) {
        throw error;
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await UserModel.findByEmail(email);
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email Id!'
            });
        }

        const validPassword = await comparePassword(password, user.pwd);
        if (!validPassword) {
            return res.status(401).json({
                success: false,
                message: 'Invalid password!'
            });
        }

        const token = jwt.sign(
            { userId: user.id, email: user.email },
            config.jwt.secret,
            { expiresIn: config.jwt.expiresIn }
        );

        res.json({
            success: true,
            message: 'Login successful',
            token
        });
    } catch (error) {
        throw error;
    }
};

module.exports = {
    signup,
    login
};


