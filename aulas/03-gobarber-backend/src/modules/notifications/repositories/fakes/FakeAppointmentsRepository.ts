import { ObjectID } from 'mongodb'
import INotificationsRepository from '../INotificationsRepositoty';
import ICreateNotidicationtDTO from '@modules/notifications/dtos/ICreateNotificationDTO';
import Notification from '../../infra/typeorm/schemas/Notification'

class FakeAppointmentsRepository implements INotificationsRepository {
  private repositories: Notification[] = []

  public async create({ content, recipient_id }: ICreateNotidicationtDTO): Promise<Notification> {
    const notification = new Notification()

    Object.assign(notification, { id: new ObjectID(), content, recipient_id })

    this.repositories.push(notification);

    return notification
  }
}

export default FakeAppointmentsRepository;
