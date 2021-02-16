import { Router } from 'express';
import ensureAuthenticaded from '@modules/users/infra/http/middlewares/ensureAuthenticaded';
import ProvidersController from '../controllers/ProvidersController';
import ProviderMonthAvailabilityController from '../controllers/ProviderMonthAvailabilityControllet';
import ProviderDayAvailabilityControllet from '../controllers/ProviderDayAvailabilityControllet';
import { celebrate, Segments, Joi } from 'celebrate'

const providersRoutes = Router();

const providersController = new ProvidersController();
const providersDayAvaliabilityController = new ProviderMonthAvailabilityController();
const providersMonthAvaliabilityController = new ProviderDayAvailabilityControllet();

providersRoutes.use(ensureAuthenticaded);

providersRoutes.get('/', providersController.index);

providersRoutes.get('/:provider-id/month-avaliability', celebrate({
  [Segments.PARAMS]: {
    provider_id: Joi.string().uuid().required()
  }
}), providersMonthAvaliabilityController.index);

providersRoutes.get('/:provider-id/day-avaliability',
  celebrate({
    [Segments.PARAMS]: {
      provider_id: Joi.string().uuid().required()
    }
  }), providersDayAvaliabilityController.index);

export default providersRoutes;
