import { container } from 'tsyringe';
import IStorageProvider from './StoreProviders/models/IStorageProvider';
import DiskStorageProvider from './StoreProviders/implementations/DiskStorageProvider';
import IMailProvider from './MailProvider/models/IMailProvider';
import MailProvider from './MailProvider/implementations/MailProvider';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider
)

container.registerSingleton<IMailProvider>(
  'MailProvider',
  MailProvider
)
