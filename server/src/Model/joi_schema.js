const Joi = require('joi');

const schema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required()
});

const UserSchema = Joi.object({
  Username: Joi.string().required(),
  Email: Joi.string().required(),
  Password: Joi.string().required(),
  Image: Joi.string()
})

const ValidateSchema = (input) => {
  return schema.validate(input);
}

const ValidateUserSchema = (input) => {
  return UserSchema.validate(input);
}

module.exports = { ValidateSchema, ValidateUserSchema };