const { default: axios } = require('axios')
const userDetail = require('../database/userService')
const db = require('../database/mongo')
const mongoose = require('mongoose');

const userChannelSchema = new mongoose.Schema({
    // Define schema fields here
    // Example:
    name: String,
    channelName: String,
    enableChannel: Boolean
  });
  
  // Define model based on schema
  const UserChannel = mongoose.model('UserChannel', userChannelSchema, 'userChannel');
  
module.exports = {
    getChannel: async function (callback){
        // console.log(channels)
        // const config = {
        //     method: 'get',
        //     url: db_url + '/getchannel',
        //     params: {
        //         uuid
        //     }
        // }
        //  axios(config).then((user_json => {
        //     new userDetail(user_json)
        //     callback(null, user_json)
        // })).catch(error => {
        //     callback(error)
        // })
        const data = await UserChannel.findOne({})

       const userInstance = new userDetail(data.toObject()); // Create instance of UserDetail with fetched data
       callback(null, userInstance)
       
    }
}