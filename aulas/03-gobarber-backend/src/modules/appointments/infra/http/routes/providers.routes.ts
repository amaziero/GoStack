import { Router } from 'express';
import ensureAuthenticaded from '@modules/users/infra/http/middlewares/ensureAuthenticaded';
import ProvidersController from '../controllers/ProvidersController';
import ProviderMonthAvailabilityController from '../controllers/ProviderMonthAvailabilityControllet';
import ProviderDayAvailabilityControllet from '../controllers/ProviderDayAvailabilityControllet';

const providersRoutes = Router();

const providersController = new ProvidersController();
const providersDayAvaliabilityController = new ProviderMonthAvailabilityController();
const providersMonthAvaliabilityController = new ProviderDayAvailabilityControllet();

providersRoutes.use(ensureAuthenticaded);

providersRoutes.get('/', providersController.index);
providersRoutes.get('/:provider-id/month-avaliability', providersMonthAvaliabilityController.index);
providersRoutes.get('/:provider-id/day-avaliability', providersDayAvaliabilityController.index);

export default providersRoutes;
