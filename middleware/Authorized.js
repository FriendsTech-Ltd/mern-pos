import asyncHandler from './async';

// Protect Routes
const authorized = asyncHandler(async (req, res, next) => {
  if (req.user.email !== process.env.DEMO_USER_EMAIL) {
    return next();
  }
  return res.status(401).json({ success: false, msg: 'unauthorized to delete' });
});

export default authorized;
