import IMailProvider from '../models/IMailProvider';
import nodemailer, { Transporter } from 'nodemailer'
import ISendMailDOT from '../dtos/ISendMailDTO';
import { inject, injectable } from 'tsyringe';
import IMailTemplateProvider from '../../MailTempleteProvider/models/IMailTemplateProvider';
import aws from 'aws-sdk'
import mailConfig from '@config/mail'

@injectable()
export default class SESMailProvider implements IMailProvider {
  private client: Transporter

  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider
  ) {
    this.client = nodemailer.createTransport({
      SES: new aws.SES({
        apiVersion: '2010-12-01',
        region: 'us-east-2',
      })
    })
  }

  public async sendMail({ to, from, subject, templateData }: ISendMailDOT): Promise<void> {
    const { name, email } = mailConfig.default.from

    await this.client.sendMail({
      from: {
        name: from?.name || name,
        address: from?.email || email
      },
      to: { name: to.name, address: to.email },
      subject,
      html: await this.mailTemplateProvider.parse(templateData)
    })
  }
}
