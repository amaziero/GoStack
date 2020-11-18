// src/routes/index.ts
import { Router } from 'express';
import appointmentsRoutes from './appointments.routes';
import usersRouter from './users.routes';
import sessionsRouter from './session.routes';

const routes = Router();

routes.use('/appointments', appointmentsRoutes);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
