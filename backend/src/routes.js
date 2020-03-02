import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import RecipintController from './app/controllers/RecipientController';
import FileController from './app/controllers/FileController';
import DeliverymanController from './app/controllers/DeliverymanController';
import DeliveryController from './app/controllers/DeliveryController';
import DeliveryOpenedController from './app/controllers/DeliveryOpenedController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.get('/deliveryman/:id', DeliveryOpenedController.index);
routes.get('/deliveryman/:id/deliveries', DeliveryOpenedController.index);

routes.use(authMiddleware);
routes.put('/users', UserController.update);

routes.get('/recipients', RecipintController.index);
routes.post('/recipients', RecipintController.store);
routes.put('/recipients/:id', RecipintController.update);


routes.post('/deliverymen', DeliverymanController.store);
routes.get('/deliverymen', DeliverymanController.index);
routes.delete('/deliverymen/:id', DeliverymanController.delele);

routes.get('/delivery', DeliveryController.index);
routes.post('/delivery', DeliveryController.store);

routes.post('/files',upload.single('file'),FileController.store);
export default routes;
