const mongoose = require('mongoose');

async function connectToMongoose() {

    await mongoose.connect('mongodb://localhost:27017/inotebook', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB successfully');
    // Continue with your application logic here
  
}

module.exports = connectToMongoose
