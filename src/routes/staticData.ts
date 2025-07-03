import { FastifyPluginAsync } from 'fastify';
import { createStaticData , getStaticData } from '../controllers/staticDataController';

const staticDataRoutes:FastifyPluginAsync = async (fastify) => {
  fastify.post('/StaticData' ,createStaticData);
  fastify.get('/AllStaticData' ,getStaticData);
}

export default staticDataRoutes;