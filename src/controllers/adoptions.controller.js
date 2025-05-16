import { adoptionsService, petsService, usersService } from "../services/index.js"
import petModel from "../dao/models/Pet.js";
import adoptionModel from "../dao/models/Adoption.js";

const getAllAdoptions = async(req,res)=>{
    const result = await adoptionsService.getAll();
    res.send({status:"success",payload:result})
}

const getAdoption = async(req,res)=>{
    const adoptionId = req.params.aid;
    const adoption = await adoptionsService.getBy({_id:adoptionId})
    if(!adoption) return res.status(404).send({status:"error",error:"Adoption not found"})
    res.send({status:"success",payload:adoption})
}

const createAdoption = async (req, res) => {
    const { uid, pid } = req.params;
    const { adoptionDate } = req.body;

    try {
        const pet = await petModel.findById(pid);
        if (!pet) return res.status(404).send({ status: 'error', error: 'Pet not found' });

        if (pet.adopted) {
            return res.status(400).send({ status: 'error', error: 'Pet is already adopted' });
        }

        const newAdoption = await adoptionModel.create({
            owner: uid,
            pet: pid,
            adoptionDate
        });

        pet.adopted = true;
        await pet.save();

        return res.status(201).send({ status: 'success', payload: newAdoption });
    } catch (err) {
        return res.status(500).send({ status: 'error', error: err.message });
    }
};

export default {
    createAdoption,
    getAllAdoptions,
    getAdoption
}