// routes/mediaLibraryRoutes.ts
import { FastifyInstance } from 'fastify';
import { createMediaLibrary } from '../controllers/mediaLibraryController';

export default async function mediaLibraryRoutes(fastify: FastifyInstance) {
  fastify.post('/media-library', createMediaLibrary);
}
