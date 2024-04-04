const Joi = require('joi');

const schema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required()
});

const ValidateSchema=(input)=>{
    return schema.validate(input);
}

module.exports= {ValidateSchema};