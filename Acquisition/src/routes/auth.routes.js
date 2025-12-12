import express from 'express';
import { signup } from '../controllers/auth.controller.js';


const router = express.Router();

router.post('/sign-up', signup);
// router.post('/sign-up', (req, res) => {
//   res.send('POST /auth/sign-up response'); // No more needed only call the signup controller for hooking
// });

router.post('/sign-in', (req, res) => {
  res.send('POST /auth/sign-in response'); // Endpoint
});

router.post('/sign-out', (req, res) => {
  res.send('POST /auth/sign-out response'); // Endpoint
});

// Inorder to make it work, we need to export the router
export default router;