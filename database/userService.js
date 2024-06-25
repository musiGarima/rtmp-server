
class userDetail{
    constructor(user){
        this._id = user._id
        this._name = user.name
        this._channelName = user.channelName
        this._enableStream = user.enableStream // check if user enable or not
        this._streamkey = user.streamkey
    }

    set streamkey(key){
        this._streamkey = key
    }
    get streamkey(){
        return this._streamkey
    }

}
module.exports = userDetail