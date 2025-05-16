import bcrypt from 'bcryptjs';
import { faker } from '@faker-js/faker';

const PASSWORD = 'coder123';

export const generateMockUsers = async (count = 1) => {
  const hashedPassword = await bcrypt.hash(PASSWORD, 10);

  return Array.from({ length: count }, () => ({
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    email: faker.internet.email(),
    password: hashedPassword,
    role: faker.helpers.arrayElement(['user', 'admin']),
    pets: []
  }));
};