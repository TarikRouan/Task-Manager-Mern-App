const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const { errorHandler } = require("./middleware/errorMiddleware");

connectDB();

const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/lists", require("./routes/ListRoutes"));
app.use("/lists", require("./routes/taskRoutes"));
app.use("/users", require("./routes/userRoutes"));

app.use(errorHandler);

app.listen(port, () => console.log(`The server is running on port ${port}`));
