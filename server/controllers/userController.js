const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
    name:String,
    email: String,
    password: String
})

const UserModel =  mongoose.model("userData", UserSchema)
module.exports = UserModel

async function logInValidation(){
    try{
        await run();
        var query = {name: "Michael Loff"}
        var collection = db.collection("userData")
        var users = collection.find(query)
        console.log("Users found: ", users)
    }catch(error){
        console.error(error);
    }

}

export default logInValidation;