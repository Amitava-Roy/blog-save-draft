const express = require("express");

const userRouter = require("./routes/userRoute");
const blogRouter = require("./routes/blogRoute");

const rateLimit = require("express-rate-limit");

const helmet = require("helmet");

const hpp = require("hpp");

const cors = require("cors");

// const AppError = require("./utils/AppError");
const globalErrorHandler = require("./golobalErrorHandler");

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: "Too many requests from this IP, please try again later.",
});

app.use("/api", limiter);

//Set security HTTP headers
app.use(helmet());

//Body parser
app.use(express.json());

//Datat senitization against NoSQL query injection
// app.use(mongoSenitize());

//parametr polution
app.use(
  hpp({
    whitelist: ["duration"],
  })
);

//Cors middleware
app.use(cors());

app.use("/api/users", userRouter);
app.use("/api/blogs", blogRouter);

app.use(globalErrorHandler);

module.exports = app;
