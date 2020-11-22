import User from '../entities/Users';
import { getRepository, Repository } from 'typeorm';
import ICreateUsersDTO from '@modules/users/dtos/ICreateUserDTO';
import IUsersRepository from '@modules/users/repositories/IUsersRepositories';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = this.ormRepository.findOne(id);

    return user;
  };

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = this.ormRepository.findOne({
      where: { email }
    });

    return user;
  };

  public async create({ name, email, password }: ICreateUsersDTO): Promise<User> {
    const user = this.ormRepository.create({
      name,
      email,
      password
    });

    await this.ormRepository.save(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  };
}

export default UsersRepository;
