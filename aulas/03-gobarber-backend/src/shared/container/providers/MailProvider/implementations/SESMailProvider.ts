import IMailProvider from '../models/IMailProvider';
// import nodemailer, { Transporter } from 'nodemailer/lib/ses-transport'
import ISendMailDOT from '../dtos/ISendMailDTO';
import { inject, injectable } from 'tsyringe';
import IMailTemplateProvider from '../../MailTempleteProvider/models/IMailTemplateProvider';


@injectable()
export default class SESMailProvider implements IMailProvider {
  // private client: Transporter

  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider
  ) { }

  public async sendMail({ to, from, subject, templateData }: ISendMailDOT): Promise<void> {
    console.log('Funcionou')
  }
}
