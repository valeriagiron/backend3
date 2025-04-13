export const mockPets = [
    { id: 1, name: 'Bobby', species: 'dog' },
    { id: 2, name: 'Mittens', species: 'cat' },
  ];
  
  export default {
    getAllPets: jest.fn(() => Promise.resolve(mockPets)),
    getPetById: jest.fn((id) => Promise.resolve(mockPets.find(pet => pet.id === id))),
  };