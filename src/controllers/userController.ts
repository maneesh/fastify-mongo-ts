import { FastifyRequest, FastifyReply } from 'fastify';
import { User } from '../models/User';

export const createUser =  async (req: FastifyRequest, reply: FastifyReply) => {
  // POST create user
  try {
    const { name , email } = req.body as{ name: string; email:string };
    const user = await User.create({name,email})
    reply.code(201).send(user)                                
    
  } catch (error) {
    reply.code(500).send({ error: 'Failed to create user' });
  }
}

export const getAllUser = async (_req: FastifyRequest, reply: FastifyReply) => {
  // GET all users
  try {
    const users = await User.find();
    reply.send(users);
  } catch (err) {
    reply.code(500).send({ error: 'Failed to get users' });
  }
}