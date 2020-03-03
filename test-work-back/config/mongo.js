const mongoose = require('mongoose');

const dbURL = process.env.MONGODB_URL;
const dbOptions = {
    useNewUrlParser: true
};

const connectWithRetry = () => {
    console.log('MongoDB connection with retry')
    mongoose.connect(dbURL, dbOptions).then(() => {
        console.log('MongoDB is connected')
    }).catch(err => {
        console.log('MongoDB connection unsuccessful, retry after 5 seconds.')
        setTimeout(connectWithRetry, 5000)
    })
}

connectWithRetry()

module.exports = mongoose;