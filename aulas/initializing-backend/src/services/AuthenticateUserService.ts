import User from '../models/Users';
import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: { email } });

    if (!user) {
      throw new Error('Incorrect email/password combibination');
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new Error('Incorrect email/password combibination');
    }

    const token = sign({}, 'eeed0c58540dc6d444a1bc1dc62695f2', {
      subject: user.id,
      expiresIn: '1d', // refresh token
    });

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
