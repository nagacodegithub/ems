require('dotenv').config()
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const mongoose = require('mongoose');


async function seedAdmin() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const email = "admin@gmail.com";
        const password = "123456"
        if (await userModel.findOne({email})) {
            console.log("User already exists!");
            
        } else {
            const admin = await userModel.create({
                username:"admin",
                email: email,
                password: password,
                role: "admin",
              });
            console.log("Create Admin user successfully");
        }

        await mongoose.disconnect();
        return true
    } catch (error) {
        throw new Error("Mongoose Connected error " + error);
        return false;
    }
    
}



module.exports = seedAdmin;
