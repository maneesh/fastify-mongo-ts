import { FastifyInstance } from 'fastify';
import {
  createCmsStaticContent,
  getCmsStaticContents,
  getCmsStaticContentById,
  getCmsStaticContentByDomainAndGroup,
  updateCmsStaticContent,
  deleteCmsStaticContent,
  getGroupsByDomain,
  getComponentsByDomainAndGroup,
  getContentByDomainGroupAndComponent
} from '../controllers/CmsStaticContentController';
import { updateCMSStaticContent } from '../controllers/updateCmsStaticContentController';

export default async function cmsStaticContentRoutes(fastify: FastifyInstance) {
//  console.log(" CmsStaticContent routes loaded");
  fastify.post('/cms-static-content', createCmsStaticContent);
  fastify.get('/cms-static-content', getCmsStaticContents);
  fastify.get('/cms-static-content/:id', getCmsStaticContentById);
  fastify.put('/cms-static-content/:id', updateCmsStaticContent);
  fastify.delete('/cms-static-content/:id', deleteCmsStaticContent);
  fastify.get('/cms-static', getCmsStaticContentByDomainAndGroup);
  fastify.get('/cms-static-content/groups', getGroupsByDomain);
  fastify.get('/cms-static-content/components', getComponentsByDomainAndGroup);
  fastify.get('/cms-static-content/content', getContentByDomainGroupAndComponent);
  fastify.put('/update-CMS-content/:domain/:group/:component', updateCMSStaticContent);
}
