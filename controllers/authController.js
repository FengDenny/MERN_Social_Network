const CatchAsync = require("../utility/CatchAsync");
const AppError = require("../utility/AppError");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const jwtExpress = require("express-jwt");
// sending email requirements START
const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
// sending email requirements END

// signup a user
exports.signup = CatchAsync(async (req, res, next) => {
  const { email, name, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    return next(
      new AppError(
        `${email} is associated with an existing account. Please login.`,
        401
      )
    );
  }
  const token = jwt.sign(
    { name, email, password },
    process.env.JWT_ACCOUNT_ACTIVATION,
    { expiresIn: "10m" }
  );

  const emailData = {
    from: process.env.EMAil_TO,
    to: email,
    subject: "Account Activation Link",
    html: `
            <table align="center" cellpadding="0" cellspacing="0"  >
            <tr>
                <td style="padding: 20px 0 30px 0;">
                    <h1 style="margin: 0; color:red; text-align:center">Please use the following link to activate your account</h1>
                </td>
            </tr>
            <tr>
                <td style="padding: 20px 0 30px 0;">
                    <a href="${process.env.CLIENT_URL}/auth/activate/${token}" style="margin: 0; color:gray; width:700px; line-height:20px">Activate your account</a>
                </td>
            </tr>
            <tr>
              <td style="padding: 20px 0 30px 0;">
                <p style="margin: 0; color:gray; width:700px; line-height:20px"> If the link doesn't work, please copy and paste this url to activate: ${process.env.CLIENT_URL}/auth/activate/${token}</p>
              </td>
            </tr>
        </table>
          `,
  };
  sgMail.send(emailData).then((sent) => {
    return res.json({
      status: "success",
      message: `Email has been sent to ${email}. Follow the instructions to activate your account.`,
    });
  });
});

exports.accountActivation = CatchAsync(async (req, res, next) => {
  // grab the token from signup
  const { token } = req.body;

  if (token) {
    jwt.verify(
      token,
      process.env.JWT_ACCOUNT_ACTIVATION,
      function (err, decoded) {
        if (err) {
          console.log("JWT VERIFY IN ACCOUNT ACTIVATION ERROR", err);
          return next(
            new AppError("Your session has expired. Please signup again.", 401)
          );
        }

        const { email, name, password } = jwt.decode(token);

        const newUser = new User({ name, email, password });

        newUser.save((err, user) => {
          if (err) {
            console.log("SAVE USER IN ACCOUNT ACTIVATION ERROR", err);
            return next(
              new AppError(
                `${email} has already been activated. Please login.`,
                401
              )
            );
          }
          return res.json({
            status: "success",
            message: `${email} has signed up successfully! Please login. `,
            user: newUser,
          });
        });
      }
    );
  }
});

exports.signin = CatchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  await User.findOne({ email })
    .select("+salt")
    .select("+hashed_password")
    .exec((err, user) => {
      if (err || !user) {
        return next(new AppError("Email does not exist. Please signup.", 400));
      }

      // authenticate
      if (!user.authenticate(password)) {
        return next(new AppError("Email and password do not match", 401));
      }
      // generate a token and send to client
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      // return res with user and token to frontend client
      const { _id, name, email, role } = user;
      return res.json({
        status: "success",
        message: `Welcome back, ${name}`,
        token,
        user: {
          _id,
          email,
          name,
          role,
        },
      });
    });
});

exports.signout = (req, res) => {
  res.clearCookie("t");
  return res.json({
    status: "success",
    message: "You have successfully signed out.",
  });
};

exports.protected = jwtExpress({
  // if token is valid, express jwt appends the verified users id
  // in an auth key to the request object
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
  userProperty: "auth",
});

exports.admin = CatchAsync(async (req, res, next) => {
  await User.findById({ _id: req.user._id }).exec((err, user) => {
    if (err || !user) {
      return next(new AppError("User does not exist", 400));
    }

    if (user.role !== "admin") {
      return next(new AppError("Admin resources. Access denied.", 400));
    }
    req.profile = user;
    next();
  });
});
