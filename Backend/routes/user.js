const express = require('express');
const router = express.Router();
const zod = require('zod');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../db'); 
const authMiddleware=require( '../middlewarre');
const signupSchema = zod.object({
    name: zod.string().min(1),
    email: zod.string().email(),
    password: zod.string().min(8)
});

router.post('/signup', async (req, res) => {
    const result = signupSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({
            message: "Incorrect data submitted",
            errors: result.error.errors 
        });
    }
    
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({
            message: "Email already taken"
        });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });
    
    const token = jwt.sign({ userId: user._id },"priyam", { expiresIn: '1h' });
    res.cookie('authToken', token, { httpOnly: true, secure: true, sameSite: 'none' });
    res.json({
        message: "User created successfully"
    });
});

const loginSchema = zod.object({
    email: zod.string().email(),
    password: zod.string().min(8)
});

router.post('/login', async (req, res) => {
    const result = loginSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({
            message: "Incorrect data submitted",
            errors: result.error.errors 
        });
    }
    
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(401).json({
            message: "Invalid email or password"
        });
    }
    
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
        return res.status(401).json({
            message: "Invalid email or password"
        });
    }
    
    const token = jwt.sign({ userId: user._id },"priyam", { expiresIn: '1h' });
    res.cookie('authToken', token, { httpOnly: true, secure: false, sameSite: 'none' });
    res.json({
        message: "Login successful"
    });
});
router.post('/logout',authMiddleware,(req,res)=>
{
    const user = req.user;
    console.log('User logging out:', user);
    res.clearCookie('authToken', { httpOnly: true, secure: false, sameSite: 'None' });
    res.json({
        message: "Logout successful"
    });
})
router.get('/test', authMiddleware, (req, res) => {
    res.json({ message: "Middleware is working!", user: req.user });
});

module.exports = router;
