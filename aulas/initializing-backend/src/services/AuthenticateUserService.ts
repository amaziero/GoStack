import User from '../models/Users';
import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';

interface Request {
  email: string;
  password: string;
}

interface AuthResponse {
  user: User;
}

class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<AuthResponse> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: { email } });

    if (!user) {
      throw new Error('Incorrect email/password combibination');
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new Error('Incorrect email/password combibination');
    }

    return {
      user,
    };
  }
}

export default AuthenticateUserService;
