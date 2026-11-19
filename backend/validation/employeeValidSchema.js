const yup = require('yup')

module.exports.employeeValidSchema = yup.object({
  name: yup.string().required("User name is required"),
  email: yup.string().email("Invalid email format").required(),
  salary: yup.number().min(10000, "Salary minimum 10000"),
  phoneNo: yup
    .string()
    .required("phone number is required")
    .matches(/^[0-9]+$/, "Phone Number Must be only digits")
    .min(10, "Phone Number Must be exactly 10 digits")
    .max(10, "Phone Number Must be exactly 10 digits"),

  dateOfBirth: yup.date().required("Date of Birth is required"),
  joinDate: yup.date().required("JoinDate is required"),
  department: yup.string().required("Department is required"),
  city: yup.string().required("JoinDate is required"),
  state: yup.string().required("state is required"),
  country: yup.string().required("city is required"),
});


module.exports.employeeUpdateValidSchema = yup.object({
  name: yup.string(),
  email: yup.string().email("Invalid email format"),
  salary: yup.number().min(10000, "Salary minimum 10000"),
  phoneNo: yup
    .string()
    .matches(/^[0-9]+$/, "Phone Number Must be only digits")
    .min(10, "Phone Number Must be exactly 10 digits")
    .max(10, "Phone Number Must be exactly 10 digits"),

  dateOfBirth: yup.date(),
  joinDate: yup.date(),
  department: yup.string(),
  city: yup.string(),
  state: yup.string(),
  country: yup.string(),
});
      
 



      
 