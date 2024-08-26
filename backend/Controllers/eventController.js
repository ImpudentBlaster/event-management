const eventSchema = require('../Models/eventSchema')

const createEvent =async (req,res) =>{
try {
    let data = new eventSchema(req.body)
    await data.save()
    res.send({event_id : data._id})
} catch (error) {
    res.status(400).send(error.message)
    console.log(error)
}
}

const showEvent = async (req,res) =>{
try {
    let data = await eventSchema.find({})
    res.status(200).send(data)
} catch (error) {
    res.status(400).send(error.message)
}
}

const deleteEvent = async (req,res) =>{
try {
    await eventSchema.findByIdAndDelete(req.params.id)
    res.send(req.params.id)
} catch (error) {
    
}
}

const updateEvent = async (req,res)=>{
    try {
        const data = req.body.event
        await eventSchema.findByIdAndUpdate(data._id , data)
        res.send("ok")
    } catch (error) {
        res.send(error.message)
        console.log(error)
    }
}

exports.updateEvent = updateEvent
exports.deleteEvent = deleteEvent
exports.showEvent = showEvent
exports.createEvent = createEvent