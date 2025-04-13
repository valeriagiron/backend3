import express from 'express'; // <-- Este debe ser el ÚNICO lugar donde declaras express
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';
import mocksRouter from './routes/mocks.router.js';

const app = express(); // <-- Usa la instancia del import
const PORT = process.env.PORT || 8080;
const connection = mongoose.connect("mongodb+srv://1234:1234@cluster0.zk1bi.mongodb.net/");

app.use(express.json());
app.use(cookieParser());

app.use('/api/users', usersRouter);
app.use('/api/pets', petsRouter);
app.use('/api/adoptions', adoptionsRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/api/mocks', mocksRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo salió mal!');
});

// Exporta para testing
export default app;

// Solo inicia el servidor si no está en modo test
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => console.log(`Listening on ${PORT}`));
}