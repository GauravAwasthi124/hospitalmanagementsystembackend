// const passport = require('passport'); 
// const httpStatus = require('http-status');
// const ApiError = require('../utils/ApiError');
// const { roleRights } = require('../config/roles');



// const verifyCallback = (req, resolve, reject, requiredRights) => async (err, user, info) => {
//   if (err || info || !user) {
//     return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate '));
//   }
//   req.user = user;
//   console.log('Authenticated user:', user);
//   console.log('Required rights:', requiredRights);
//   if (requiredRights.length) {
//     const userRights = roleRights.get(user.role);
//     const hasRequiredRights = requiredRights.every((requiredRight) => userRights.includes(requiredRight));
//     if (!hasRequiredRights && req.params.userId !== user.id) {
//       return reject(new ApiError(httpStatus.FORBIDDEN, 'Forbidden'));
//     }
//   }
//   resolve();
// };

// const auth = (...requiredRights) => async (req, res, next) => {
//   return new Promise((resolve, reject) => {
//     passport.authenticate('jwt', { session: false }, verifyCallback(req, resolve, reject, requiredRights))(req, res, next);
//     console.log('error');
//   })
//   .then(() => next())
//   .catch((err) => next(err));
// };

// module.exports = auth;

//new code 


const passport = require('passport');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { roleRights } = require('../config/roles');

const verifyCallback = (req, requiredRights, resolve, reject) => async (err, user, info) => {
  if (err || info || !user) {
    console.log('Token:', req.headers['authorization']);
    console.log('User:', user);
    console.log('Info:', info);
    return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate'));
  }

  req.user = user;

  if (requiredRights.length) {
    const userRights = roleRights[user.role] || [];
    console.log('User Rights:', userRights);
    console.log('Required Rights:', requiredRights);

    const hasRequiredRights = requiredRights.every((requiredRight) => userRights.includes(requiredRight));
    console.log('Has Required Rights:', hasRequiredRights);
    console.log('User ID from Token:', user.id);
    console.log('Requested User ID:', req.params.userId);

    // if (!hasRequiredRights && req.params.userId !== string(user.id)) {
    //   return reject(new ApiError(httpStatus.FORBIDDEN, 'Forbidden'));
    // }
  }

  resolve();
};

const auth = (...requiredRights) => (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    new Promise((resolve, reject) => {
      verifyCallback(req, requiredRights, resolve, reject)(err, user, info);
    })
      .then(() => next())
      .catch((err) => next(err));
  })(req, res, next);
};

module.exports = auth;
