
import { Router } from 'express';
import {
  getUsers,
  approveUser,
  updateUserLocation,
  updateUserStatus,
} from '../controllers/user.controller';
import { protect, admin } from '../middleware/auth.middleware';

const router = Router();

router.route('/').get(protect, admin, getUsers);
router.route('/:id/approve').put(protect, admin, approveUser);
router.route('/:id/location').put(protect, updateUserLocation);
router.route('/:id/status').put(protect, updateUserStatus);

export default router;
