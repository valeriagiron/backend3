import petsMock from '../__mocks__/pets.js';

export const getAllPets = () => {
    return petsMock; 
};

export const getPetById = (id) => {
    return petsMock.find(pet => pet.id === id) || null;
};

export default {
    getAllPets,
    getPetById,
};
  