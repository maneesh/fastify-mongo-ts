import { FastifyRequest, FastifyReply } from "fastify";
import PageComponent from "../models/CmsStaticContent";

// Type for Update Request
type UpdateCMSStaticDataRequest = FastifyRequest<{
  Params: { domain: string; group: string; component: string };
  Body: Partial<{
    contents: {
      type: "text" | "media";
      Title?: string;
      name?: string;
      data?: string;
      media_ref?: string;
    }[];
  }>;
}>;

// ✅ Update CMS Static Content by domain + group + component
export const updateCMSStaticContent = async (
  req: UpdateCMSStaticDataRequest,
  reply: FastifyReply
) => {
  try {
    const { domain, group, component } = req.params;
    const updatedData = req.body;

    // Find record by domain + group + component
    const previousData = await PageComponent.findOne({ domain, group, component });
    if (!previousData) {
      return reply.code(404).send({ error: "CMS static data not found" });
    }

    // Update contents (explicit rebuild)
    if (updatedData.contents !== undefined) {
      previousData.set(
        "contents",
        updatedData.contents.map(content => ({
          type: content.type,
          Title: content.type === "text" ? content.Title ?? "" : undefined,
          name: content.type === "media" ? content.name ?? "" : undefined,
          data: content.type === "text" ? content.data ?? "" : undefined,
          media_ref:
            content.type === "media"
              ? (content.media_ref ?? "").trim()
              : undefined,
        }))
      );
    }

    // Save updates
    const updated = await previousData.save();
    return reply.code(200).send(updated);
  } catch (error) {
    console.error("CMS Update Error:", error);
    return reply.code(500).send({ error: "Internal Server Error" });
  }
};

// Type for Get Request
type GetCMSStaticDataRequest = FastifyRequest<{
  Params: { domain: string; group: string; component: string };
}>;

// ✅ Get CMS Static Content by domain + group + component
export const getCMSStaticDataById = async (
  req: GetCMSStaticDataRequest,
  reply: FastifyReply
) => {
  try {
    const { domain, group, component } = req.params;

    const cmsData = await PageComponent.findOne({ domain, group, component });
    if (!cmsData) {
      return reply.code(404).send({ error: "CMS static data not found" });
    }

    return reply.code(200).send(cmsData);
  } catch (error) {
    console.error("CMS Fetch Error:", error);
    return reply.code(500).send({ error: "Internal Server Error" });
  }
};
