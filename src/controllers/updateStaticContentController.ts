import { FastifyRequest, FastifyReply } from "fastify";
import StaticContent from "../models/StaticData";
import mongoose from "mongoose";

type UpdateStaticContentRequest = FastifyRequest<{
  Params: { id: string };
  Body: Partial<{
    domain: string;
    page: string;
    sections: {
      name?: string;
      contents: {
        type: 'text' | 'image' | 'video';
        name?: string;
        data: string;
      }[];
    }[];
  }>;
}>;

export const updateStaticContent = async (
  req: UpdateStaticContentRequest,
  reply: FastifyReply
) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return reply.code(400).send({ error: "Invalid ID format" });
    }

    const previousData = await StaticContent.findById(id);
    if (!previousData) {
      return reply.code(404).send({ error: "Static content not found" });
    }

    if (updatedData.domain !== undefined) previousData.domain = updatedData.domain;
    if (updatedData.page !== undefined) previousData.page = updatedData.page;

    //content updated
    if (updatedData.sections !== undefined) {
      previousData.set("sections", updatedData.sections.map(section => ({
        name: section.name,
        contents: section.contents.map(content => ({
          type: content.type,
          name: content.name ?? '',
          data: content.data
        }))
      })));
    }

    // Save updates
    const updated = await previousData.save();
    // return reply.code(200).send({ message: "Static content updated successfully" });
    return reply.code(200).send(updated);
  } catch (error) {
    console.error("Update Error:", error);
    return reply.code(500).send({ error: "Internal Server Error" });
  }
};

type GetStaticContentRequest = FastifyRequest<{
  Params: { id: string };
}>;

export const getStaticContentById = async (
  req: GetStaticContentRequest,
  reply: FastifyReply
) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return reply.code(400).send({ error: "Invalid ID format" });
    }

    const previousData = await StaticContent.findById(id);
    if (!previousData) {
      return reply.code(404).send({ error: "Static content not found" });
    }

    return reply.code(200).send(previousData);
  } catch (error) {
    console.error("Fetch Error:", error);
    return reply.code(500).send({ error: "Internal Server Error" });
  }
};
