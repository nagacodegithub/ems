require('dotenv').config()
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const mongoose = require('mongoose');


async function seedUser() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const email = "john@gmail.com";
        const password = "123456"
        if (await userModel.findOne({email})) {
            console.log("User already exists!");
            
        } else {
            const user = await userModel.create({
                username:"john",
                email: email,
                password: password,
                role: "user",
              });
            console.log("Create user user successfully");
        }

        await mongoose.disconnect();
        return true
    } catch (error) {
        throw new Error("Mongoose Connected error " + error);
        return false;
    }
    
}


module.exports = seedUser;