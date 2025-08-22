import { FastifyInstance } from "fastify";
import { getAllMedia, createMedia } from "../controllers/MediaDataController";

export default async function mediaRoutes(fastify: FastifyInstance) {
  fastify.get("/media", getAllMedia);
  fastify.post("/media", createMedia);
}
