import ISendMailDOT from '../dtos/ISendMailDTO';
import IMailProvider from '../models/IMailProvider';

export default class FaKeMailProvider implements IMailProvider {
  private messages: ISendMailDOT[] = []

  public async sendMail(message: ISendMailDOT): Promise<void> {
    await this.messages.push(message);
  }
}
