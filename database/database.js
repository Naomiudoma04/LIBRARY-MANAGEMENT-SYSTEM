require('dotenv').config();
const {Sequelize} = require('sequelize')
host = process.env.DBHOST
username = process.env.DBUSER
password = process.env.DBPASSWORD
name= process.env.DBNAME
port=process.env.DBPORT



const sequelize = new Sequelize(name, username, password, {
  host: host,
  dialect: "mysql",
  port: port
});


module.exports = sequelize