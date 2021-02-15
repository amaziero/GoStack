import { container } from 'tsyringe';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepositories';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';

import IUsersRepository from '@modules/users/repositories/IUsersRepositories';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepositories';

import IUserTokenRepository from '@modules/users/repositories/IUserTokenRepositories';
import UserTokenRepository from '@modules/users/infra/typeorm/repositories/UsersTokensRepository';

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepositoty';
import NotificationsRepository from '@modules/notifications/infra/typeorm/repositories/NotificationsRepository';

import '@modules/users/providers'
import './providers';

container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository);

container.registerSingleton<IAppointmentsRepository>('AppointmentsRepository', AppointmentsRepository);

container.registerSingleton<IUserTokenRepository>('UserTokenRepository', UserTokenRepository);

container.registerSingleton<INotificationsRepository>('NotificationRepository', NotificationsRepository);
