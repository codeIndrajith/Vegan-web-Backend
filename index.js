const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors')
dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

const connectDB = require('./config/db')
const errorHandler = require("./middleware/error")

const auth = require('./routes/authRoute');
const product = require('./routes/product-manufacture/productRoutes');
const shop = require('./routes/resturant-manufacture/shopRoutes');
const food = require('./routes/resturant-manufacture/foodRoutes');
const farmerProduct = require('./routes/farmer/productRoutes');

// db connection
connectDB();


// Body parser
app.use(express.json());

// Cookie Parser
app.use(cookieParser());

// Enable CORS
app.use(cors());


// register all routes
app.use('/api/auth' , auth);
app.use('/api/product-manufacture/products', product);
app.use('/api/resturant-manufacture/shops', shop);
app.use('/api/resturant-manufacture/foods', food);
app.use('/api/farmer/products', farmerProduct);

// use the error handling middleware
app.use(errorHandler);


app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`)
})

