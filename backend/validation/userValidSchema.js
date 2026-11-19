const yup = require('yup')

module.exports.userValidSchema = yup.object({
  username: yup.string().required("Username is required"),
  email: yup.string().email("Invalid email format").required(),
  password: yup.string().required("Password is required"),
});
      
 module.exports.userUpdateSchema = yup.object({
   username: yup.string(),
   email: yup.string().email("Invalid email format"),
   password: yup.string(),
 });