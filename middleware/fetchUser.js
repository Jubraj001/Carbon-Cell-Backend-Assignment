const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const INVALID_USER_ERROR = 'Please authenticate with a valid token';

const fetchUser = (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) {
    return res.status(401).send({ error: INVALID_USER_ERROR });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch(error) {
    res.status(401).send({ error: INVALID_USER_ERROR });
  }
}

module.exports = fetchUser;
