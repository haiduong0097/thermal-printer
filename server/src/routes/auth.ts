/* eslint-disable no-console */
import { Router } from 'express';
import { hash, verify } from 'argon2';
import { sign } from 'jsonwebtoken';
import verifyToken from '../middleware/auth';
import _ from 'lodash';
import User from '../models/User';

const router = Router();

// @route GET api/auth
// @desc Check if user is logged in
// @access Private
router.get('/', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(_.get(req, ['userId'])).select(
      '-password',
    );
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: 'User not found' });
    res.json({ success: true, user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// @route POST api/auth/register
// @desc Register user
// @access Public
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  // Simple validation
  if (!username || !password)
    return res
      .status(400)
      .json({ success: false, message: 'Missing username and/or password' });

  try {
    // Check for existing user
    const user = await User.findOne({ username });

    if (user)
      return res
        .status(400)
        .json({ success: false, message: 'Username already taken' });

    // All good
    const hashedPassword = await hash(password);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    // Return token
    const accessToken = sign(
      { userId: newUser._id },
      process.env.ACCESS_TOKEN_SECRET || '',
    );

    res.json({
      success: true,
      message: 'User created successfully',
      accessToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// @route POST api/auth/login
// @desc Login user
// @access Public
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Simple validation
  if (!username || !password)
    return res
      .status(400)
      .json({ success: false, message: 'Missing username and/or password' });

  try {
    // Check for existing user
    const user = await User.findOne({ username });
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: 'Incorrect username or password' });

    // Username found
    const passwordValid = await verify(user.password, password);
    if (!passwordValid)
      return res
        .status(400)
        .json({ success: false, message: 'Incorrect username or password' });

    // All good
    // Return token
    const accessToken = sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET || '',
    );

    res.json({
      success: true,
      message: 'User logged in successfully',
      accessToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

export default router;
