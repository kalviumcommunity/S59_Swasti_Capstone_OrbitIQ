const Joi = require('joi');
const LearningUnit = require('./learningUnit_schema');

const schema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required()
});

const UserSchema = Joi.object({
  Username: Joi.string().required(),
  Email: Joi.string().required(),
  Password: Joi.string().required(),
  Image: Joi.string().default('./public/profile-default.png')
})

const LearningModuleSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  learningUnits: Joi.array().items(Joi.string().pattern(/^[0-9a-fA-F]{24}$/)),
  ImgUrl: Joi.string().required(),
  level: Joi.string().required()
})


const ValidateSchema = (input) => {
  return schema.validate(input);
}

const ValidateUserSchema = (input) => {
  return UserSchema.validate(input);
}

const ValidateLearningModule = (input) => {
  return LearningModuleSchema.validate(input);
}

module.exports = { ValidateSchema, ValidateUserSchema, ValidateLearningModule };