const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require("body-parser");
const path = require('path');
const cors = require('cors');
const connectDB = require('./server/database/connection');
const cookieParser = require('cookie-parser');
const app = express();
const authroutes =require('./server/routes/auth');
dotenv.config( { path : 'config.env'} )
const PORT = process.env.PORT || 8030

app.use(morgan('tiny'));

connectDB();

app.use(bodyparser.urlencoded({ extended : true}))

app.set("view engine", "ejs")
app.use(cookieParser());
app.use(cors());
app.use('/css', express.static(path.resolve(__dirname, "assets/css")))
app.use('/img', express.static(path.resolve(__dirname, "assets/img")))
app.use('/js', express.static(path.resolve(__dirname, "assets/js")))
app.use(express.static("uploads"));
app.use('/',require('./server/routes/router') );
app.use('/api/auth', authroutes);
app.listen(PORT, ()=> { console.log(`Server is running on http://localhost:${PORT}`)});