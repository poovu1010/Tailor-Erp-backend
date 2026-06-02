const mongoose = require('mongoose')


const profileSchema = mongoose.Schema({
    OwnerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"AdminModel",
        required:true
    },
    profileUrl:{
        type:String,
        required:true
    }

})

const ProfileModel = mongoose.model("prfile_links",profileSchema);