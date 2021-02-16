import { Router } from 'express';
import ensureAuthenticaded from '@modules/users/infra/http/middlewares/ensureAuthenticaded';
import AppointmentsController from '../controllers/AppointmentsController';
import ProviderAppointmentsController from '../controllers/ProviderAppointmentsController';
import { celebrate, Segments, Joi } from 'celebrate'

const appoitmentsRouter = Router();
const appointmentController = new AppointmentsController();
const providerAppointmentsController = new ProviderAppointmentsController()

appoitmentsRouter.use(ensureAuthenticaded);

appoitmentsRouter.post('/', celebrate({
  [Segments.BODY]: {
    provider_id: Joi.string().uuid().required(),
    date: Joi.date().required()
  }
}), appointmentController.create);

appoitmentsRouter.get('/me',
  providerAppointmentsController.index);

export default appoitmentsRouter;
