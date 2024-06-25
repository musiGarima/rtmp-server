const mongoose = require('mongoose')
const horichan = require('../libs/getChannel')

const MONGO_URL = process.env.MONGO_URL || 'mongodb+srv://loveanimeandcode:gaurabgb@livegb.edx24eg.mongodb.net/horichan'



module.exports = async function Connectdb(){
    try {
        const connect = await mongoose.connect(MONGO_URL, {
            dbName: 'horichan'
        })
        console.log('connection with db sucessfully')
        // await horichan.getChannel((data) => {
        //     console.log(data)
        //   })
    } catch (error) {
        console.log('failed to connect db', error.message)
    }
}