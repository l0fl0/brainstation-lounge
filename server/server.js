const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");

// config
dotenv.config({ path: "./config/.env" });


// initialize the application
const app = express();

// Logger for development 
if (process.env.NODE_ENV === "development") {
  app.use(morgan('dev'))
}

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));