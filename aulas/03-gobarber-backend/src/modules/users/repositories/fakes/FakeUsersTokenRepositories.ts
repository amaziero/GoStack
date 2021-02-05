import { uuid } from 'uuidv4';
import IUsersTokenRepositories from '@modules/users/repositories/IUserTokenRepositories';
import UserToken from '../../infra/typeorm/entities/UserToken';


class UsersTokenRepositories implements IUsersTokenRepositories {
  private usersToken: UserToken[] = [];

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = await this.usersToken.find(
      userToken => userToken.token === token
    );

    return userToken;
  }

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = new UserToken();

    Object.assign(userToken, {
      id: uuid(),
      token: uuid(),
      user_id,
      created_at: new Date(),
      updated_at: new Date()
    });

    this.usersToken.push(userToken);

    return userToken;
  }
}

export default UsersTokenRepositories;
