import { Router } from 'express';
import ensureAuthenticaded from '@modules/users/infra/http/middlewares/ensureAuthenticaded';
import AppointmentsController from '../controllers/AppointmentsController';
import ProviderAppointmentsController from '../controllers/ProviderAppointmentsController';

const appoitmentsRouter = Router();
const appointmentController = new AppointmentsController();
const providerAppointmentsController = new ProviderAppointmentsController()

appoitmentsRouter.use(ensureAuthenticaded);

appoitmentsRouter.post('/', appointmentController.create);
appoitmentsRouter.get('/me', providerAppointmentsController.index);

export default appoitmentsRouter;
