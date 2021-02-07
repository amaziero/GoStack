import ISendMailDOT from '../dtos/ISendMailDTO';

export default interface IMailProvider {
  sendMail(data: ISendMailDOT): Promise<void>;
};
