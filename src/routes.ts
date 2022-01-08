import { Router } from 'express';
import { ChaveController } from './controllers/ChaveController';
import { UserController } from './controllers/UserController';
import { TransactionController } from './controllers/TransactionController';

const routes = Router();

// Users
routes.get('/users', new UserController().show);
routes.get('/users/chaves', new UserController().showChaves);
routes.post('/users', new UserController().store);

// Chaves
routes.get('/chaves', new ChaveController().show);
routes.post('/chaves', new ChaveController().store);

// Transactions
routes.post('/transactions', new TransactionController().store);
routes.get('/transactions', new TransactionController().show);

export { routes };
