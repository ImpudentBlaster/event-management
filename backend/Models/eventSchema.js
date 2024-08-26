const mongoose = require('mongoose')
const eventData = mongoose.Schema({
    title:{
        type:String,
        required:false
    },
    description:{
        type:String,
        required:false
    },
    date:{
        type:String,
        required:false
    },
    time:{
        type:String,
        required:false
    },
    location:{
        type:String,
        required:false
    },
    created_by:{
        type:String,
        required:false
    },
    invited:{
        type:[String],
        required:false
    },
    admin_id:{
        type:String,
        required:false
    }
})

const eventSchema = mongoose.model('eventSchema' , eventData)
module.exports = eventSchema