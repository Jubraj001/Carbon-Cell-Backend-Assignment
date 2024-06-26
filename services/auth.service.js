const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

const INCORRECT_CREDENTIALS_ERROR = [ 400, { success: false, message: 'The credentials entered are incorrect!' } ];
const SERVER_ERROR = [ 500, { success: false, message: 'Internal Server Error!' } ];

const registerService = async (email, name, password) => {
  try {
    let user = await User.findOne({ email: email }).exec();
    if(user) {
      return [ 400, { success: false, message: 'Sorry a user with this email already exists!' } ];
    }

    // Securing the password
    const salt = await bcrypt.genSaltSync(10);
    const secPass = await bcrypt.hashSync(password, salt);

    user = await User.create({
      name: name,
      email: email,
      password: secPass,
    });

    const authToken = generateJWT(user.id);

    return [ 200, { success: true, message: 'Successfully registered!', authToken } ];
  } catch(error) {
    return SERVER_ERROR;
  }
};

const loginService = async (email, password) => {
  try {
    let user = await User.findOne({ email }).exec();
    if(!user) {
      return INCORRECT_CREDENTIALS_ERROR;
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if(!passwordCompare) {
      return INCORRECT_CREDENTIALS_ERROR;
    }

    const authToken = generateJWT(user.id);

    return [ 200, { success: true, message: 'Successfully logged in!', authToken } ];
  } catch(error) {
    return SERVER_ERROR;
  }
};

const generateJWT = (id) => {
  const data = {
    user: {
      id: id
    }
  };

  return jwt.sign(data, JWT_SECRET);
};

const getUserService = async (userId) => {
  try {
    const user = await User.findById(userId).select('-password');
    return [ 200, user ];
  } catch(error) {
    return SERVER_ERROR;
  }
};

module.exports = { registerService, loginService, getUserService };
