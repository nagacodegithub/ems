const { Schema, model } = require("mongoose");
const helper = require('../utils/helper')
const employeeSchema = new Schema(
  {
    empId: {
      type: String,
      required: true,
      unique: true,
      trim:true,
    },
    name: {
      type: String,
      minlength: 3,
      maxlength: 30,
      unique: true,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      minlength: 3,
      maxlength: 30,
      unique: true,
      lowercase: true,
      validate: {
        validator: function (v) {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: "Please enter a valid email",
      },
      trim: true,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    salary: {
      type: Number,
      default: 0,
    },
    joinDate: {
      type: Date,
      required: true,
    },
    phoneNo: {
      type:String,
      minlength:[10, "no should have minimum 10 digits"],
      maxlength: [10, "no should have maximum 10 digits"],
      match: [/\d{10}/, "no should only have digits"],
      required:true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
      default: null,
    },
    status: {
      type: String,
      enum: ["active", "Inactive"],
      default: "active",
    },
  },
  { timestamps: true },
);

employeeSchema.virtual('profileImagePath').get(function () {
  return this.profileImage ? helper.baseUrl()+"/uploads/image/employees/"+this.profileImage:"";
});
employeeSchema.statics.paginate = async function (filter = {}, options = {}){
    const {
      page = 1,
      limit = 20,
      sort = { createdAt: -1 },
      projection,
    } = options;
    
    const skip = (page -1)*limit
    const [docs, total] = await Promise.all([
      this.find(filter, projection).limit(limit).skip(skip).sort(sort),
      this.countDocuments(filter),
    ]);
    
  return {
    docs: docs,
    pagination: {
      total,
      page,
      limit,
      totalPage: Math.ceil(total / limit),
    },
  };

}

module.exports = model('Employee',employeeSchema)