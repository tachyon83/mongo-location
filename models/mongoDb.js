// acts as a singleton
// mongodb connection is seperated

const mongodb = require('mongodb')
const mongoDbUrl = "mongodb://localhost:27017/local"
const mongoClient = mongodb.MongoClient
const dbName = 'local'

let database
const initiate = () => {
    return new Promise((resolve, reject) => {
        mongoClient.connect(mongoDbUrl, { useUnifiedTopology: true }, (err, db) => {
            if (err) return reject(err)
            database = db.db(dbName)
            resolve()
        })
    })
}

module.exports = async () => {
    if (!database) {
        console.log('this should be done only once')
        await initiate()
    } else console.log('database has aleady been established')
    return database
}

// // below can be added in a file where this singleton is called
// // note that 'db.collection(...)' is needed
// const getUserList = async () => {
//     const db = await getMongoDb()
//     const user = db.collection('user')
//     user.find().toArray((err, docs) => {
//         if (err) throw err
//         console.log(docs)
//     })
//     let db2 = await getMongoDb()
//     const user2 = db2.collection('user')
//     user2.find({ 'id': 'oh' }).toArray((err, docs) => {
//         if (err) throw err
//         console.log(docs)
//     })
// }