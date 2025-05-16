export const mockPets = [
  { id: 1, name: 'Bobby', species: 'dog' },
  { id: 2, name: 'Mittens', species: 'cat' },
];

const isJest = typeof jest !== 'undefined';

export default {
  getAllPets: isJest 
      ? jest.fn(() => Promise.resolve(mockPets))
      : () => Promise.resolve(mockPets),

  getPetById: isJest 
      ? jest.fn((id) => Promise.resolve(mockPets.find(pet => pet.id === id)))
      : (id) => Promise.resolve(mockPets.find(pet => pet.id === id)),
};