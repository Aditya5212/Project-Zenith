require("dotenv").config();
const express = require("express");
const logger = require("./utils/logger.js");
const morgan = require("morgan");
const dbConnect = require("./config/dbConnect.config.js")
const userRoutes = require("./routes/user.routes.js")
const cookieParser = require("cookie-parser")
const cors = require("cors");
dbConnect();

const morganFormat = ":method :url :status :response-time ms";


const app = express();
// app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use(cookieParser());
app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);

app.use("/api/users", userRoutes);




app.get("/", (req, res) => {
    res.send("Hello World!");
})

module.exports = app;
