import { FastifyPluginAsync } from 'fastify';
import { createUser , getAllUser } from '../controllers/userController';

const userRoutes:FastifyPluginAsync = async (fastify) => {
  fastify.get('/user' ,getAllUser);
  fastify.post('/user' ,createUser);
}

export default userRoutes;