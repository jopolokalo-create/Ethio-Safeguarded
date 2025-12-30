
import { Request, Response } from 'express';
import { User } from '../models/user.model';
import { Notification } from '../models/notification.model';

export const updateUserLocation = async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id);
  if (user && user.role === 'DRIVER') {
    user.truckDetails.location = req.body.location;
    const updatedUser = await user.save();
    req.io.emit('locationUpdate', {
      userId: updatedUser._id,
      location: updatedUser.truckDetails.location,
    });
    res.json(updatedUser);
  } else {
    res.status(404).json({ message: 'Driver not found' });
  }
};

export const updateUserStatus = async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id);
  if (user && user.role === 'DRIVER') {
    user.truckDetails.currentStatus = req.body.status;
    const updatedUser = await user.save();
    res.json(updatedUser);
  } else {
    res.status(404).json({ message: 'Driver not found' });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  const users = await User.find({});
  res.json(users);
};

export const approveUser = async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id);
  if (user) {
    user.status = 'APPROVED';
    const updatedUser = await user.save();

    const notification = await Notification.create({
      userId: user._id,
      title: 'Account Approved',
      message: 'Your account has been approved by an administrator.',
      type: 'SUCCESS',
    });

    req.io.emit('notification', notification);

    res.json(updatedUser);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};
