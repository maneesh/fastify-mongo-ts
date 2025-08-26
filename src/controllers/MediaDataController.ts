import { FastifyReply, FastifyRequest } from "fastify";
import MediaData, { IMedia } from "../models/MediaData"; // updated schema

// Get all media
export const getAllMedia = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const data = await MediaData.find();
    return reply.code(200).send(data);
  } catch (error) {
    return reply.code(500).send({ error: (error as Error).message });
  }
};

// Create Media request body type
interface CreateMediaBody {
  domain: string;
  folder: string;
  media: {
    name: string;
    url: string;
    alt?: string;
    type: string,
    size: string,
    dimension:string,
  };
}

// Create media
export const createMedia = async (
  req: FastifyRequest<{ Body: CreateMediaBody }>,
  reply: FastifyReply
) => {
  try {
    const { domain, folder, media } = req.body;

    // Validate domain
    if (!domain || typeof domain !== "string") {
      return reply.code(400).send({ error: "domain must be a string" });
    }

    // Validate folder
    if (typeof folder !== "string") {
      return reply.code(400).send({ error: "folder must be a string" });
    }

    // Validate media object
    if (
      !media ||
      typeof media !== "object" ||
      typeof media.name !== "string" ||
      typeof media.url !== "string"
    ) {
      return reply.code(400).send({ error: "media must be an object with valid name and url" });
    }

    // Save to database
    const newMedia = new MediaData({ domain, folder, media });
    const saved = await newMedia.save();

    return reply.code(201).send(saved);
  } catch (error) {
    return reply.code(500).send({ error: (error as Error).message });
  }
};
