import { getMongoRepository, MongoRepository } from 'typeorm';
import ICreateNotidicationtDTO from '@modules/notifications/dtos/ICreateNotificationDTO';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepositoty';
import Notification from '../schemas/Notification'

class NotificationRepository implements INotificationsRepository {
  private ormRepository: MongoRepository<Notification>;

  constructor() {
    this.ormRepository = getMongoRepository(Notification, 'mongo');
  }

  public async create({ content, recipient_id }: ICreateNotidicationtDTO): Promise<Notification> {
    const notification = this.ormRepository.create({
      content: 'asdasdas',
      recipient_id
    });

    await this.ormRepository.save(notification);

    return notification
  }
}

export default NotificationRepository;
