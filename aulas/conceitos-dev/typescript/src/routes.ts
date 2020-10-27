import { Request, Response } from 'express'
import createUser from './services/CreateUser'

export default function helloWord(resquest: Request, response: Response) {
  const user = createUser({
    name: 'Alison',
    email: 'alison_lens@hotmail.com',
    password: '31321654',
    techs: [
      "",
      { experience: 100, title: "asasd" },
      {experience: 64, title: "5asdas31"}
    ]
  });

  return response.json(user)
}