import { FastifyRequest, FastifyReply } from "fastify";
import StaticContent from '../models/StaticData';

export const createStaticData = async (req: FastifyRequest, reply: FastifyReply) => {
  // POST static data
  try {
    const { domain ,page ,sections } = req.body as{
        domain : string;
        page: string;
        sections : {
            name ?: string;
            contents: { type: 'text' | 'image' | 'video'; data :string }[];
        }[];
    }
    if (!domain || !page || !Array.isArray(sections)) {
      return reply.code(400).send({ error: 'Missing or invalid fields' });
    }
    const newStaticContent = await StaticContent.create({ domain, page, sections });

    reply.code(200).send({
        message:'Static content created successfully',
        data: newStaticContent
    })
    }catch (error: any) {
        console.log('error creating static content' ,error.message)
    reply.code(500).send({ error: "Failed to create user" });
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