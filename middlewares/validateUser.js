// // eslint-disable-next-line @typescript-eslint/no-var-requires
// const { createResponse } = require('../utils/responseGenerator');
// // eslint-disable-next-line @typescript-eslint/no-var-requires
// const { verifyJWT } = require('../utils/jwt_token');

// module.exports.validateUser = async (req, res, next) => {
//   const { authorization } = req.headers;
//   if (!authorization)
//     return res.json(createResponse(null, 'Not authenticated!'));

//   try {
//     let splitted = authorization.split(' ');
//     let token = splitted[1];
//     token = JSON.parse(token);

//     const { email } = await verifyJWT(token);
//     req.email = email;
//     return next();
//   } catch (err) {
//     return res.json(createResponse(null, err));
//   }
// };
