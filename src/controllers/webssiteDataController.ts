import PageComponentSchema, { IPageComponent } from '../models/CmsStaticContent';     
import { FastifyRequest, FastifyReply } from "fastify";
//import { IStaticContent } from '../models/CmsStaticContent'; // Make sure this import exists

export const getAllWebsiteDetails = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const staticData = await PageComponentSchema.find();

    const groupedData: Record<string, { id: string; group: string }[]> = {};

    staticData.forEach((item: IPageComponent) => {
      if (!groupedData[item.domain]) {
        groupedData[item.domain] = [];
      }

      groupedData[item.domain].push({
        id: item.id.toString(), 
        group: item.group||"",
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
