import User from '../models/Users';
import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

interface RequestUser {
  name: string;
  email: string;
  password?: string;
}

class CreateUserService {
  public async execute({ name, email, password }: RequestUser): Promise<User> {
    const userRepository = getRepository(User);
    const checkUserExists = await userRepository.findOne({
      where: { email },
    });

    if (checkUserExists) {
      throw new Error('Email already used');
    }

    if (!password) {
      throw new Error('You must pass the password');
    }

    const hashedPassword = await hash(password, 8);

    const user = userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await userRepository.save(user);

    return user;
  }
}

export default CreateUserService;
