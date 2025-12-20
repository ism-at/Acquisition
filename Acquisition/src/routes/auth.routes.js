import express from 'express';
import { signIn, signOut, signup } from '../controllers/auth.controller.js';


const router = express.Router();

router.post('/sign-up', signup); // Endpoint
// router.post('/sign-up', (req, res) => {
//   res.send('POST /auth/sign-up response'); // No more needed only call the signup controller for hooking
// });

router.post('/sign-in', signIn); // Endpoint


router.post('/sign-out', signOut); // Endpoint

// Inorder to make it work, we need to export the router
export default router;