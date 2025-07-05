import { FastifyRequest, FastifyReply } from "fastify";
import StaticContent from '../models/StaticData';

interface IContent {
  type: 'text' | 'image' | 'video';
  name: string;
  data: string;
}

interface ISection {
  name?: string;
  contents: IContent[];
}

interface CreateStaticDataBody {
  domain: string;
  page: string;
  sections: ISection[];
}

export const createStaticData = async (
  req: FastifyRequest<{ Body: CreateStaticDataBody }>,
  reply: FastifyReply
) => {
  try {
    const { domain, page, sections } = req.body;

    if (!domain || !page || !Array.isArray(sections)) {
      return reply.code(400).send({ error: 'Missing or invalid fields' });
    }

    const newStaticContent = await StaticContent.create({ domain, page, sections });

    return reply.code(201).send({
      message: 'Static content created successfully',
      data: newStaticContent
    });
  } catch (error: any) {
    console.error('Error creating static content:', error.message);
    return reply.code(500).send({ error: 'Failed to create static content' });
  }
};

export const getStaticData = async (req: FastifyRequest, reply: FastifyReply) => {
    //get static data
    try {
        const staticData = await StaticContent.find();
        reply.send(staticData);
    } catch (error) {
        reply.code(500).send({ error: "Failed to get static data" });
    }

}

interface QueryParams {
  domain?: string;
  page?: string;
}

export const getStaticDataByDomainAndPage = async (
  req: FastifyRequest<{ Querystring: QueryParams }>,
  reply: FastifyReply
) => {
  const { domain, page } = req.query;

  if (!domain || !page) {
    return reply
      .code(400)
      .send({ error: 'Both domain and page query parameters are required' });
  }

  try {
    const staticData = await StaticContent.findOne({ domain, page });

    if (!staticData) {
      return reply
        .code(404)
        .send({ error: 'No static content found for the given domain and page' });
    }

    reply.send(staticData);
  } catch (error) {
    console.error('Error fetching static data:', error);
    reply.code(500).send({ error: 'Failed to get static data' });
  }
};