import { Router } from 'express';
import ensureAuthenticaded from '@modules/users/infra/http/middlewares/ensureAuthenticaded';
import AppointmentsController from '../controllers/AppointmentsController';

const appoitmentsRouter = Router();
const appointmentController = new AppointmentsController();

appoitmentsRouter.use(ensureAuthenticaded);

appoitmentsRouter.post('/', appointmentController.create);

export default appoitmentsRouter;
