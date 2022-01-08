import { Router } from 'express';
import { ChaveController } from './controllers/ChaveController';
import { UserController } from './controllers/UserController';
import { CreateTransactionController } from './controllers/CreateTransactionController';

const routes = Router();

// Users
routes.get('/users', new UserController().show);
routes.post('/users', new UserController().store);

// Chaves
routes.get('/chaves', new ChaveController().show);
routes.post('/chaves', new ChaveController().store);

// Transactions
routes.post('/transactions', new CreateTransactionController().handle);

export { routes };