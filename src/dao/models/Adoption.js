import mongoose from "mongoose";


const collection = "Adoptions";

const schema = new mongoose.Schema({
    owner:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'Users'
    },
    pet:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'Pets'
    },
    adoptionDate: {
        type: Date,
        required: true
    }
})

const adoptionModel = mongoose.model(collection,schema);

export default adoptionModel;