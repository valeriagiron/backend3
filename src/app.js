import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const swaggerDocument = require('./docs/swagger.json');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;
const MONGO_URI = process.env.DB_URI || 'mongodb://localhost:27017/defaultdb'; // ✅ Maneja la conexión de forma segura

app.use(express.json());
app.use(cookieParser());

// Swagger Docs Route ✅
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';
import mocksRouter from './routes/mocks.router.js';

// Conexión a la base de datos
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('📦 Conexión a la base de datos exitosa'))
.catch((err) => console.error('❌ Error en la conexión a la base de datos:', err));

app.use(express.json());
app.use(cookieParser());

// Rutas de la aplicación
app.use('/api/users', usersRouter);
app.use('/api/pets', petsRouter);
app.use('/api/adoptions', adoptionsRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/api/mocks', mocksRouter);

// Middleware de manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo salió mal!');
});

// Exporta la app para testing
export default app;

// Inicia el servidor solo si no está en modo test
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => console.log(`Servidor escuchando en puerto ${PORT}`));
}
