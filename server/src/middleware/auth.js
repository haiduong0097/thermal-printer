/* eslint-disable no-console */
import { verify } from 'jsonwebtoken';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const verifyToken = (req, res, next) => {
  const authHeader = req.header('Authorization');
  const token = authHeader && authHeader.split(' ')[1];

  if (!token)
    return res
      .status(401)
      .json({ success: false, message: 'Access token not found' });

  try {
    const decoded = verify(token, process.env.ACCESS_TOKEN_SECRET);

    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.log(error);
    return res.status(403).json({ success: false, message: 'Invalid token' });
  }
};

export default verifyToken;
