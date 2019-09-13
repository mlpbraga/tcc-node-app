const { celebrate } = require('celebrate');
const { Router } = require('express');
const joiSchema = require('./validation');
const usersController = require('../../controllers/users');
const authValidation = require('../../middlewares/auth');

const router = new Router({ mergeParams: true });

const joiOptions = {
  allowUnknown: false,
};

const validateMiddleware = (req, res, next) => {
  celebrate(joiSchema, joiOptions)(req, res, next);
};

router.get(
  '/',
  // validateMiddleware,
  authValidation.basicAuthentication,
  usersController.handleGet,
);

// router.post(
//   '/',
//   usersController.handlePost,
// );

// router.put(
//   '/',
//   usersController.handlePut,
// );

// router.delete(
//   '/',
//   usersController.handleDelete,
// );

module.exports = router;
