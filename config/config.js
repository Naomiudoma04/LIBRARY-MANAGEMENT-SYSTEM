require('dotenv').config();

host = process.env.DBHOST
username = process.env.DBUSER
password = process.env.DBPASSWORD
name= process.env.DBNAME
port = process.env.DBPORT


module.exports= {
  "development": {
    "username": username,
    "password": password,
    "database": name,
    "host": host,
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": username,
    "password": password,
    "database": name,
    "host": host,
    "dialect": "mysql",
    "port": port
  }
}
