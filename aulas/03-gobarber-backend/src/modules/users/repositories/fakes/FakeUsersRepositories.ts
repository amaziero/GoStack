import User from '../../infra/typeorm/entities/Users';
import ICreateUsersDTO from '@modules/users/dtos/ICreateUserDTO';
import IUsersRepositories from '@modules/users/repositories/IUsersRepositories';
import { uuid } from 'uuidv4';

class UsersRepositories implements IUsersRepositories {
  private users: User[] = [];

  public async findAllProviders(except_user_id?: string): Promise<User[]> {
    let user = this.users

    if (except_user_id) {
      user = this.users.filter(user => user.id !== except_user_id)
    }

    return user;
  };

  public async findById(id: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.id === id);

    return findUser;
  };

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.email === email);

    return findUser;
  };

  public async create(userData: ICreateUsersDTO): Promise<User> {
    const user = new User();

    Object.assign(user, { id: uuid() }, userData)
    this.users.push(user)

    return user;
  }

  public async save(user: User): Promise<User> {
    const findIndex = this.users.findIndex(findUser => findUser.id === user.id)

    this.users[findIndex] = user;

    return user;
  };
}

export default UsersRepositories;
