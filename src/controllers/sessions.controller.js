import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import UserModel from '../dao/models/User.js';
import dotenv from 'dotenv';

dotenv.config();

const jwtSecret = process.env.JWT_SECRET;
const jwtExpiration = process.env.JWT_EXPIRATION || '1h';

if (!jwtSecret) {
    throw new Error('❌ JWT_SECRET is not defined in the .env file!');
}

const register = async (req, res) => {
    const { email, password, firstName, lastName } = req.body;

    try {
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ status: 'error', message: 'Usuario ya existe' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await UserModel.create({
            email,
            password: hashedPassword,
            first_name: firstName,
            last_name: lastName,
        });

        res.json({ status: 'success', message: 'Usuario registrado', user: newUser });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Error en el registro', details: error.message });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(401).json({ status: 'error', message: 'Usuario no encontrado' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ status: 'error', message: 'Contraseña incorrecta' });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            jwtSecret,
            { expiresIn: jwtExpiration }
        );

        res.cookie('token', token, {
            httpOnly: true,
            secure: false, // Solo desarrollo
            maxAge: 1000 * 60 * 60, // 1 hora
        });

        res.json({ status: 'success', message: 'Login exitoso', token });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Error en el login', details: error.message });
    }
};

const current = (req, res) => {
    // Simula la recuperación de usuario actual desde el token
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ status: 'error', message: 'No hay sesión activa' });
    }

    try {
        const user = jwt.verify(token, jwtSecret);
        res.json({ status: 'success', user });
    } catch (error) {
        res.status(403).json({ status: 'error', message: 'Token inválido o expirado' });
    }
};

// Métodos de prueba sin protección de token
const unprotectedLogin = (req, res) => {
    res.json({ status: 'success', message: 'Login sin protección de token (modo prueba)' });
};

const unprotectedCurrent = (req, res) => {
    res.json({ status: 'success', message: 'Ruta sin protección de token (modo prueba)' });
};

// ✅ Export Default para que funcione tu importación como la tienes
export default {
    register,
    login,
    current,
    unprotectedLogin,
    unprotectedCurrent,
};