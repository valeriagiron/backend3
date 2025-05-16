import bcrypt from 'bcryptjs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

export const createHash = async (password) => {
  const salts = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salts);
};

export const passwordValidation = async (user, password) => 
  bcrypt.compare(password, user.password);

// Solución para __dirname con ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname;