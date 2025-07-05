import { FastifyPluginAsync } from 'fastify';
import { createStaticData , getStaticData , getStaticDataByDomainAndPage} from '../controllers/staticDataController';

const staticDataRoutes:FastifyPluginAsync = async (fastify) => {
  fastify.post('/StaticData' ,createStaticData);
  fastify.get('/AllStaticData' ,getStaticData);
  fastify.get('/static', getStaticDataByDomainAndPage);
}

export default staticDataRoutes;