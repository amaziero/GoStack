import UpdateProfileService from '@modules/users/services/UpdtadeProviderService';
import ShowProfileService from '@modules/users/services/ShowProfileService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.body;
    const showProfileService = container.resolve(ShowProfileService);

    const user = await showProfileService.execute({ user_id })

    return response.status(200).json(user);
  }


  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { name, email, old_password, password } = request.body;

    const updateProfileService = container.resolve(UpdateProfileService);

    const user = await updateProfileService.execute({
      user_id,
      name,
      email,
      old_password,
      password
    });

    return response.status(200).json(user);
  };
}
