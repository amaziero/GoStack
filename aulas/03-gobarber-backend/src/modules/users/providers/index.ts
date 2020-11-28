import { container } from 'tsyringe';
import IHasProvider from './HashProvider/models/IHashProvider';
import BCryptHashProvider from './HashProvider/implementations/BCryptHashProvider'

container.registerSingleton<IHasProvider>('HashProvider', BCryptHashProvider);
