const mongoose = require('mongoose')
const mongoSettings = require('./settings/mongoSettings')

module.exports = () => {
    // using node.js promise
    mongoose.Promise = global.Promise
    mongoose.connect(process.env.mongoUri, mongoSettings.connectOption)
        .then(() => console.log('successfully conneced to mongodb'))
        .catch(err => console.err(err))
    // dbConnection = mongoose.connection
}