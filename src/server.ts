import dotenv from 'dotenv';
dotenv.config();
import 'reflect-metadata';
import './database';
import express from 'express';
import { routes } from './routes';

const app = express();

app.use(express.json());
app.use(routes);

app.listen(process.env.PORT, () => console.log(`Running in port ${process.env.PORT}`));
