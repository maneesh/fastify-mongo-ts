import { FastifyRequest, FastifyReply } from 'fastify';
import PageComponent, { IPageComponent } from '../models/CmsStaticContent';
import CmsStaticContent from '../models/CmsStaticContent';

// CREATE
export const createCmsStaticContent = async (
  request: FastifyRequest<{ Body: IPageComponent }>,
  reply: FastifyReply
) => {
  try {
    const newComponent = new PageComponent(request.body);
    const saved = await newComponent.save();
    reply.code(201).send(saved);
  } catch (error) {
    reply.code(500).send({ error: 'Failed to create component', details: error });
  }
};

// READ ALL
export const getCmsStaticContents = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const components = await PageComponent.find();
    reply.send(components);
  } catch (error) {
    reply.code(500).send({ error: 'Failed to fetch components', details: error });
  }
};

// READ ONE
export const getCmsStaticContentById = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  try {
    const component = await PageComponent.findById(request.params.id);
    if (!component) {
      return reply.code(404).send({ message: 'Component not found' });
    }
    reply.send(component);
  } catch (error) {
    reply.code(500).send({ error: 'Failed to fetch component', details: error });
  }
};

// Get CMS static content by domain and group
interface QueryParams {
  domain?: string;
  group?: string;
}

export const getCmsStaticContentByDomainAndGroup = async (
  req: FastifyRequest<{ Querystring: QueryParams }>,
  reply: FastifyReply
) => {
  const { domain, group } = req.query;

  // Validate query params
  if (!domain || !group) {
    return reply
      .code(400)
      .send({ error: "Both domain and group query parameters are required" });
  }

  try {
    // Find content by domain and group
    const cmsContent = await CmsStaticContent.find({ domain, group });

    if (!cmsContent) {
      return reply
        .code(404)
        .send({ error: "No CMS static content found for the given domain and group" });
    }

    reply.send(cmsContent);
  } catch (error) {
    console.error("Error fetching CMS static content:", error);
    reply.code(500).send({ error: "Failed to get CMS static content" });
  }
};

// UPDATE
export const updateCmsStaticContent = async (
  request: FastifyRequest<{ Params: { id: string }; Body: Partial<IPageComponent> }>,
  reply: FastifyReply
) => {
  try {
    const updated = await PageComponent.findByIdAndUpdate(
      request.params.id,
      request.body,
      { new: true }
    );
    if (!updated) {
      return reply.code(404).send({ message: 'Component not found' });
    }
    reply.send(updated);
  } catch (error) {
    reply.code(500).send({ error: 'Failed to update component', details: error });
  }
};

// DELETE
export const deleteCmsStaticContent = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  try {
    const deleted = await PageComponent.findByIdAndDelete(request.params.id);
    if (!deleted) {
      return reply.code(404).send({ message: 'Component not found' });
    }
    reply.send({ message: 'Component deleted successfully' });
  } catch (error) {
    reply.code(500).send({ error: 'Failed to delete component', details: error });
  }
};
