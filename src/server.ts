import dotenv from 'dotenv';
dotenv.config();

import 'reflect-metadata';
import './database';
import express from 'express';
import { routes } from './routes';

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(routes);

app.listen(port || 3333, () => console.log(`Running in port ${port || 3333}`));
