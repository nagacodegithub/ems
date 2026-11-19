const express = require('express')
const app = express()
const cors = require('cors')
const cookieParser = require('cookie-parser')
const authRouter = require('./routers/authRouter')
const userRouter = require("./routers/userRouter");
const employeeRouter = require("./routers/employeeRouter");
const { verifyTokenMiddleware } = require("./middleware/authMiddleware")
const errorHandleMiddleware = require("./middleware/errorHandleMiddleware");
const path = require('path')
const helmet = require("helmet");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
app.use(
  cors({
      origin:process.env.CLIENT_URL
      credentials:true,
  }),
);
app.use(express.static(path.join(__dirname, "public")));
app.use("/api/", authRouter);
app.use(verifyTokenMiddleware);
app.use("/api/users", userRouter);
app.use("/api/employees", employeeRouter);
app.use(errorHandleMiddleware);

module.exports = app;



