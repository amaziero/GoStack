import { container } from 'tsyringe';
import mailConfig from '@config/mail'

import IStorageProvider from './StoreProviders/models/IStorageProvider';
import DiskStorageProvider from './StoreProviders/implementations/DiskStorageProvider';

import IMailProvider from './MailProvider/models/IMailProvider';
import EtherealMailProvider from './MailProvider/implementations/EtherealMailProvider';

import SESMailProvider from './MailProvider/implementations/SESMailProvider';

import IMailTemplateProvider from './MailTempleteProvider/models/IMailTemplateProvider';
import HandlebarsMailTempleMailProvider from './MailTempleteProvider/implementations/HandlebarsMailTempleMailProvider';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider
)

container.registerInstance<IMailTemplateProvider>(
  'MailTemplateProvider',
  container.resolve(HandlebarsMailTempleMailProvider),
)

container.registerInstance<IMailProvider>(
  'MailProvider',
  mailConfig.driver === 'ethereal'
    ? container.resolve(EtherealMailProvider)
    : container.resolve(SESMailProvider)
)
