require('dotenv').config();
const express =require ('express');
const sequelize = require('./database/database.js')
const PORT = process.env.PORT

const app = express();

app.use(express.json())


const connectToDB = async(req, res)=>{
    try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}
};

connectToDB()

app.listen(PORT,()=>{
    console.log(`Server is running on PORT: ${PORT}`)
})

