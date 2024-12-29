const mongoose = require('mongoose');

// Connect to MongoDB
const dbConnect = ()=>{
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{
         console.log('Connected to MongoDB...');
    })
    .catch(err => console.error(`Failed to connect to MongoDB: ${err}`));
}

module.exports = dbConnect;