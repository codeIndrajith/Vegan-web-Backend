const Users = require('../models/Users');
const asyncHandler = require('../middleware/async')


// @desc     Register users
// @route    POST /api/v1/auth/register
// @access   Public

const registerUsers = asyncHandler(async (req, res, next) => {
    const { firstName, lastName, nic, contactNumber, email, role, password } = req.body;
  
    const user = await Users.create({
      firstName,
      lastName,
      nic,
      contactNumber,
      email,
      role,
      password,
    });
  
    sendTokenResponse(user, 200, res);
  });






  // Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
    // Create token
    const token = user.getSignedJwtToken();
  
    const option = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };
  
    if (process.env.NODE_ENV === 'production') {
      option.secure = true;
    }
  
    res.status(statusCode).cookie('token', token, option).json({
      success: true,
      token,
    });
  };




  module.exports = {registerUsers};