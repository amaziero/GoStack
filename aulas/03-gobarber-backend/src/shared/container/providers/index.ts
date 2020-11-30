import { container } from 'tsyringe';
import IStorageProvider from './StoreProviders/models/IStorageProvider';
import DiskStorageProvider from './StoreProviders/implementations/DiskStorageProvider';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider
)
