import Joi from "joi";

export const requiredFields = (data: any) => {
    const requiredFields = [
        "tag",
        "value",
        "type"
    ];

    for (const field of requiredFields) {
        if (!data[field]) {
          return  `Missing param: ${field}`
        }
    }
    return;
}

export const handle = (data: any) => {
  const schema = Joi.object().keys({
    tag: Joi.string().required(),
    value: Joi.number().required(),
    type: Joi.string().required()
  })

  const result = schema.validate(data);

  return result;
}

export default {
  handle,
  requiredFields
}