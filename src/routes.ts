import { Router } from 'express';
import { CreateChaveController } from './controllers/CreateChaveController';
import { GetAllChavesController } from './controllers/GetAllChavesController';
import { CreateUserController } from './controllers/CreateUserController';
import { GetAllUsersController } from './controllers/GetAllUsersController';

const routes = Router();

routes.get('/users', new GetAllUsersController().handle);
routes.post('/users', new CreateUserController().handle);

routes.get('/chaves', new GetAllChavesController().handle);
routes.post('/chaves', new CreateChaveController().handle);

export { routes };