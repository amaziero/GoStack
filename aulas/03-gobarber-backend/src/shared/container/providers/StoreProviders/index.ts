import { container } from 'tsyringe';
import IStorageProvider from '../StoreProviders/models/IStorageProvider';
import DiskStorageProvider from '../StoreProviders/implementations/DiskStorageProvider';

const providers = {
  diskStorage: DiskStorageProvider
}

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  providers.diskStorage,
)
