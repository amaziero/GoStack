import { container } from 'tsyringe';
import IHasProvider from './HashProvider/models/IHashProvider';
import BCryptHashProvider from './HashProvider/implementations/BCryptHasHProvider';

container.registerSingleton<IHasProvider>('HashProvider', BCryptHashProvider);
