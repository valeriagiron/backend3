import { faker } from '@faker-js/faker';
import bcrypt from 'bcryptjs';
import UserModel from '../dao/models/User.js';
import PetModel from '../dao/models/Pet.js';
import { getAllPets } from '../services/pets.js';

const generateMockUsers = async (count = 1) => {
    const hashedPassword = await bcrypt.hash('coder123', 10);
    const roles = ['user', 'admin'];

    return Array.from({ length: count }, () => ({
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        password: hashedPassword,
        role: roles[Math.floor(Math.random() * roles.length)],
        pets: []
    }));
};

export const getMockedPets = async (req, res, next) => {
    try {
        const pets = await getAllPets();
        res.json({ status: 'success', payload: pets });
    } catch (error) {
        next(error);
    }
};

export const generateMockedUsers = async (req, res) => {
    try {
        const count = parseInt(req.query.count) || 50;
        const users = await generateMockUsers(count);
        res.json({ status: 'success', payload: users });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Error al generar usuarios', details: error.message });
    }
};

export const generateData = async (req, res) => {
    try {
        const userCount = parseInt(req.query.users) || 0;
        const petCount = parseInt(req.query.pets) || 0;

        const users = await generateMockUsers(userCount);
        await UserModel.insertMany(users);

        const pets = Array.from({ length: petCount }, () => ({
            name: faker.animal.cat(),
            specie: faker.animal.type(),
            birthDate: faker.date.past({ years: 3 }),
        }));
        await PetModel.insertMany(pets);

        res.json({ status: 'success', message: 'Datos generados e insertados correctamente' });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Error al insertar datos', details: error.message });
    }
};