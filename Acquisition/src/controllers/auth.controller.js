// Export one function, when the endpoints reached => routes/auth.routes.js

import logger from '../config/logger.js';
import { formatValidationError } from '../utils/format.js';
import { signupSchema } from '../validations/auth.validation.js';
import { createUser } from '../services/auth.service.js';
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
  try {
    const validationResult = signupSchema.safeParse(req.body);

    if (!validationResult.success) {
      return res.status(400).json({
        error: 'Validation failed',
        details: formatValidationError(validationResult.error),
      });
    }

    const { name, email, password, role } = validationResult.data;

    // auth.service.js
    const user = await createUser({ name, email, password, role });
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET || 'change_this_secret',
      { expiresIn: '1h' }
    );

    logger.info(`User registered successfully: ${email}`);

    // For now, just return a dummy response without token:
    res.status(201).json({
      message: 'User registered (stub)',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (e) {
    logger.error('Signup error', e); // <-- use .error, not .errors

    if (e.message === 'User with this email already exis') {
      return res.status(409).json({ error: 'Email already exist' });
    }

    next(e);
  }
};




