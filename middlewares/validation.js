const { celebrate, Joi } = require('celebrate');
const { isValidObjectId } = require('mongoose');
const { isURL } = require('validator');

const { minlength, maxlength } = require('../models/helpers/stringWithConstrainedLength');

const StringRequired = Joi.string().required();
const StringWithConstrainedLength = Joi.string().min(minlength).max(maxlength);
const StringUri = Joi.string().custom((v) => isURL(v, { require_protocol: true }));

const celebrateJoiBody = (obj) => celebrate({
  body: Joi.object().keys(obj),
});

const credentials = {
  email: StringRequired.email(),
  password: StringRequired,
};

const validateRegister = celebrateJoiBody({
  name: StringWithConstrainedLength,
  about: StringWithConstrainedLength,
  avatar: StringUri,
  ...credentials,
});
const validateLogin = celebrateJoiBody({ ...credentials });

const validateUserAvatar = celebrateJoiBody({
  avatar: StringUri.required(),
});
const validateUserInfo = celebrateJoiBody({
  name: StringWithConstrainedLength.required(),
  about: StringWithConstrainedLength.required(),
});

const validateCard = celebrateJoiBody({
  name: StringWithConstrainedLength.required(),
  link: StringUri.required(),
});

const validateObjectId = celebrate({
  params: Joi.object().keys({
    id: StringRequired.custom(isValidObjectId),
  }),
});

module.exports = {
  validateRegister,
  validateLogin,
  validateUserAvatar,
  validateUserInfo,
  validateCard,
  validateObjectId,
};
