import IMailProvider from '../models/IMailProvider';

interface IMessages {
  to: string;
  body: string;
}

export default class FaKeMailProvider implements IMailProvider {
  private messages: IMessages[] = []

  public async sendMail(to: string, body: string): Promise<void> {
    await this.messages.push({
      to,
      body
    });
  }
}
