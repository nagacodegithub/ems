const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt')

const userSchema = new Schema(
  {
    username: {
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
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    status: {
      type: String,
      enum: ["active", "Inactive"],
      default: "active",
    },
  },
  { timestamps: true },
);

userSchema.pre("save", async function() {
    const hashPassword = await bcrypt.hash(this.password, 10);
    this.password = hashPassword;
});

userSchema.methods.comparePassword = async function (inputPassword) {
    return await bcrypt.compare(inputPassword,this.password);
};

userSchema.statics.paginate = async function (filter = {}, options = {}) {
  const {
    page = 1,
    limit = 20,
    sort = { createdAt: -1 },
    projection,
  } = options;

  const skip = (page - 1) * limit;
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
};

module.exports = model("User", userSchema);