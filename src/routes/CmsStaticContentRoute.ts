import { FastifyInstance } from 'fastify';
import {
  createCmsStaticContent,
  getCmsStaticContents,
  getCmsStaticContentById,
  getCmsStaticContentByDomainAndGroup,
  updateCmsStaticContent,
  deleteCmsStaticContent
} from '../controllers/CmsStaticContentController';

export default async function cmsStaticContentRoutes(fastify: FastifyInstance) {
  console.log("✅ CmsStaticContent routes loaded");
  fastify.post('/cms-static-content', createCmsStaticContent);
  fastify.get('/cms-static-content', getCmsStaticContents);
  fastify.get('/cms-static-content/:id', getCmsStaticContentById);
  fastify.put('/cms-static-content/:id', updateCmsStaticContent);
  fastify.delete('/cms-static-content/:id', deleteCmsStaticContent);
  fastify.get('/cms-static', getCmsStaticContentByDomainAndGroup);
}
