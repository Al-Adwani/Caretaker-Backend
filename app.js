const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const passport = require("passport");
// const path = require("path");

//Routes
const guardianRoutes = require("./api/guardian/guardian.routes");
const careTakerRoutes = require("./api/careTaker/careTaker.routes");
//DB
const connectDB = require("./db");

//Middleware
const logger = require("./middleware/logger");

const errorHandler = require("./middleware/errorHandler");

//Passport
const {
  localStrategyGuardian,
  jwtStrategyGuardian,
} = require("./middleware/passportGuardian");
const {
  localStrategyCareTaker,
  jwtStrategyCareTaker,
} = require("./middleware/passportCareTaker");

const app = express();
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(logger);

//Passport
app.use(passport.initialize());
//signin guardian
passport.use("localStrategyGuardian", localStrategyGuardian);
passport.use(jwtStrategyGuardian);
//signin caretaker
app.use(passport.initialize());

passport.use(localStrategyCareTaker);
passport.use(jwtStrategyCareTaker);
// Routes
app.use("/api/guardian", guardianRoutes);
app.use("/api/caretaker", careTakerRoutes);

app.use(errorHandler);

app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});
