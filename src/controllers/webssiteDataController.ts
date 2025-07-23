import StaticContent from '../models/StaticData';
import { FastifyRequest, FastifyReply } from "fastify";
import { IStaticContent } from '../models/StaticData'; // Make sure this import exists

export const getAllWebsiteDetails = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const staticData = await StaticContent.find();

    const groupedData: Record<string, { id: string; page: string }[]> = {};

    staticData.forEach((item: IStaticContent) => {
      if (!groupedData[item.domain]) {
        groupedData[item.domain] = [];
      }

      groupedData[item.domain].push({
        id: item.id.toString(), 
        page: item.page,
      });
    });

    const websites = Object.entries(groupedData).map(([domain, pages]) => ({
      label: domain,
      subItems: pages,
    }));

    reply.send(websites);
  } catch (error) {
    console.error(error);
    reply.code(500).send({ error: "Failed to get website details" });
  }
};
