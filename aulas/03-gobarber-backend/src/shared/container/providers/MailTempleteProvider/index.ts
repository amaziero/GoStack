import { container } from 'tsyringe';
import IMailTemplateProvider from './models/IMailTemplateProvider';
import HandlebarsMailTempleMailProvider from '../MailTempleteProvider/implementations/HandlebarsMailTempleMailProvider';

const providers = {
  handlebars: container.resolve(HandlebarsMailTempleMailProvider)
}

container.registerInstance<IMailTemplateProvider>(
  'MailTemplateProvider',
  providers.handlebars,
)
