import { Router, type Response,type Request } from 'express';
import { signup, login, logout } from '../controllers/authController';
import { authMiddleware } from '../middleware/authMiddleware';
import {type AuthRequest} from "../middleware/authMiddleware"

const router = Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout)
router.get("/me", authMiddleware, (req:AuthRequest, res:Response) => {
  res.json({ user: req.user  });
});

export default router;