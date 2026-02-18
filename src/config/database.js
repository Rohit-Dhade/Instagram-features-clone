const mongoose = require('mongoose')

async function ConnectTodb() {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('Connect to MongoDb');
}

module.exports = ConnectTodb