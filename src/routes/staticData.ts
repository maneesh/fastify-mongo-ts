import { FastifyPluginAsync } from 'fastify';
import { createStaticData , getStaticData , getStaticDataByDomainAndPage} from '../controllers/staticDataController';
import { getAllWebsiteDetails } from '../controllers/webssiteDataController'
import { updateStaticContent,getStaticContentById } from '../controllers/updateStaticContentController'

const staticDataRoutes:FastifyPluginAsync = async (fastify) => {
  fastify.post('/StaticData' ,createStaticData);
  fastify.get('/AllStaticData' ,getStaticData);
  fastify.get('/static', getStaticDataByDomainAndPage);
  fastify.get('/admin/websites', getAllWebsiteDetails);
  fastify.put("/update-content/:id", updateStaticContent);
  fastify.get("/getAllContentById/:id", getStaticContentById);
}

export default staticDataRoutes;