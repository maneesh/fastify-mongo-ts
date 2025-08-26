import { FastifyInstance } from "fastify";
import { getAllMedia, createMedia, deleteStaticDataPage } from "../controllers/MediaDataController";

export default async function mediaRoutes(fastify: FastifyInstance) {
  fastify.get("/media", getAllMedia);
  fastify.post("/media", createMedia);
  fastify.delete("/media/:id", deleteStaticDataPage);
}
