const NodeMediaServer = require("node-media-server");
const axios = require("axios");
// const userInstance = require("../database/userService");
const userInstance = require("./getChannel");
const BASE_URL = 'https://livestreaminggb.azurewebsites.net'
const config = {
  rtmp: {
    port: 1935,
    chunk_size: 4096,
    gop_cache: false,
    ping: 30,
    ping_timeout: 60,
    reconnect_time: 10,
    debug: true,
  },
};

module.exports = function rtmpServer() {
  const nms = new NodeMediaServer(config);
  nms.on("prePublish", async (id, StreamPath, args) => {
    console.log(`Stream published: id=${id}, StreamPath=${StreamPath}`);
    const streamkey = StreamPath.split('/')[2]
    console.log('key: ', streamkey[2])
    let userkey;
    const user = await new Promise((resolve, reject) => {
      userInstance.getChannel((error, user) => {
        if (error) {
          reject(error);
        } else {
          resolve(user);
        }
      });
    });
    userkey = user.streamkey
    console.log(userkey)
    console.log(streamkey)
    const session = nms.getSession(id)

    if(streamkey !== userkey){
      console.log('Stream key does not match user key. Publishing rejected.');
      session.reject()
    }else{
      await axios.post(`http://${BASE_URL}/test`, {
    streamPath: StreamPath,
})
    }

  });

  nms.on("postPublish", (id, StreamPath, args) => {
    console.log("[Node Media Server] Stream published:", StreamPath);
    // Additional actions after stream starts publishing
    // const streamInfo = nms.getSession(id)
    // console.log('Stream info:', streamInfo);
    console.log(args);
  });
  nms.run();
};
