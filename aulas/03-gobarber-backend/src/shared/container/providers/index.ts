import { container } from 'tsyringe';
import IStorageProvider from './StoreProviders/models/IStorageProvider';
import DiskStorageProvider from './StoreProviders/implementations/DiskStorageProvider';

import IMailProvider from './MailProvider/models/IMailProvider';
import EtherealMailProvider from './MailProvider/implementations/EtherealMailProvider';

import IMailTemplateProvider from './MailTempleteProvider/models/IMailTemplateProvider';
import HandlebarsMailTempleMailProvider from './MailTempleteProvider/implementations/HandlebarsMailTempleMailProvider';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider
)

container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  HandlebarsMailTempleMailProvider,
)

container.registerInstance<IMailProvider>(
  'MailProvider',
  container.resolve(EtherealMailProvider),
)
