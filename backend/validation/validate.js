const fs =require("fs").promises;

const validate = schema =>{
    return async (req, res, next) => {
    try {
      await schema.validate(req.body, { abortEarly: false });
      next();
    } catch (error) {
      next(error);
    }
  };
};

module.exports = validate;
