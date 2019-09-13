const { celebrate } = require('celebrate');
const { Router } = require('express');
const { getSchema, postSchema } = require('./validation');
const usersController = require('../../controllers/users');
const authValidation = require('../../middlewares/auth');

const router = new Router({ mergeParams: true });

const joiOptions = {
  allowUnknown: false,
};

const authMiddleware = (req, res, next) => {
  if (req.headers.authorization) {
    return req.headers.authorization.includes('Bearer')
      ? authValidation.check(req, res, next)
      : authValidation.basicAuthentication(req, res, next);
  }
  return authValidation.basicAuthentication(req, res, next);
};

router.get(
  '/',
  celebrate(getSchema, joiOptions),
  authMiddleware,
  usersController.handleGet,
);

router.post(
  '/',
  celebrate(postSchema, joiOptions),
  authMiddleware,
  usersController.handlePost,
);

// router.put(
//   '/',
//   validateMiddleware,
//   authMiddleware,
//   usersController.handlePut,
// );

// router.delete(
//   '/',
//   validateMiddleware,
//   authMiddleware,
//   usersController.handleDelete,
// );

module.exports = router;
