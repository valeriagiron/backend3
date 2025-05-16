import { Router } from 'express';
import { getMockedPets, generateMockedUsers, generateData } from '../controllers/mocks.controller.js';

const router = Router();

router.get('/mockingpets', getMockedPets);

router.get('/mockingusers', generateMockedUsers);

router.post('/generateData', generateData);

export default router;