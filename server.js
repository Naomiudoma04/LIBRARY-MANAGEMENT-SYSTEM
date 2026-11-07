require("dotenv").config();
const express = require("express");
const sequelize = require("./database/database.js");
const bookRouter = require('./routes/bookRouter.js')
const PORT = process.env.PORT;
const joi = require("joi");

const app = express();

app.use(express.json());

app.use(bookRouter);


const connectToDB = async (req, res) => {
   try {
      await sequelize.authenticate();
      console.log("Connection has been established successfully.");
   } catch (error) {
      console.error("Unable to connect to the database:", error.message);
   }
};

connectToDB();

app.listen(PORT, () => {
   console.log(`Server is running on PORT: ${PORT}`);
});
