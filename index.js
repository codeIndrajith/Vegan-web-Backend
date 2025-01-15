const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors')
dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

const connectDB = require('./config/db')

const auth = require('./routes/authRoute');

// db connection
connectDB();


// Body parser
app.use(express.json());

// Cookie Parser
app.use(cookieParser());

// Enable CORS
app.use(cors());


// register all routes
app.use('/api/v1/auth' , auth);


app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`)
})

