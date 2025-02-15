const Users = require("../models/Users");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");

// @desc     Register users
// @route    POST /api/v1/auth/register
// @access   Public

const registerUsers = asyncHandler(async (req, res, next) => {
  const {
    firstName,
    lastName,
    nic,
    contactNumber,
    email,
    role,
    password,
    confiremPassword,
  } = req.body;

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

// @desc     Login user
// @route    POST /api/v1/auth/login
// @access   Public

const login = asyncHandler(async (req, res, next) => {
  const { email, password, role } = req.body;

  // Validate email and password
  if (!email || !password) {
    return next(new ErrorResponse("Please provide an email and password", 400));
  }

  // Check for user
  const user = await Users.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  if (role !== user.role) {
    return next(new ErrorResponse("Access denied", 403));
  }

  // Check if password matches
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  sendTokenResponse(user, 200, res);
});

// @desc     Logout user
// @route    GET /api/v1/auth/logout
// @access   Private

const logout = asyncHandler(async (req, res, next) => {
  res.cookie("token", "none", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    data: {},
  });
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

  if (process.env.NODE_ENV === "production") {
    option.secure = true;
  }

  res
    .status(statusCode)
    .cookie("token", token, option)
    .json({
      success: true,
      user: {
        userId: user._id,
        userName: user.firstName + " " + user.lastName,
        userEmail: user.email,
        userRole: user.role,
      },
    });
};

module.exports = { registerUsers, login, logout };
