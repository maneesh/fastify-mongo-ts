// controllers/mediaLibraryController.ts
import { FastifyReply, FastifyRequest } from 'fastify';
import MediaLibrary from '../models/MediaData';

// Type for request body
interface CreateMediaLibraryBody {
  domain: string;
  folder: string[];
  media: {
    name: string;
    url: string;
    alt?: string;
  }[]; // Array of objects
}

// POST: Create Media Library
export const createMediaLibrary = async (
  request: FastifyRequest<{ Body: CreateMediaLibraryBody }>,
  reply: FastifyReply
) => {
  try {
    const { domain, folder, media } = request.body;

    // Validate domain
    if (!domain) {
      return reply.status(400).send({
        success: false,
        message: 'Domain is required'
      });
    }

    // Validate media array
    if (!Array.isArray(media) || media.length === 0) {
      return reply.status(400).send({
        success: false,
        message: 'At least one media object is required'
      });
    }

    // Validate each media item
    for (const m of media) {
      if (!m.name || !m.url) {
        return reply.status(400).send({
          success: false,
          message: 'Each media item must have a name and a url'
        });
      }
    }

    // Create document
    const newMedia = new MediaLibrary({
      domain,
      folder,
      media
    });

    const savedMedia = await newMedia.save();

    return reply.status(201).send({
      success: true,
      message: 'Media Library created successfully',
      data: savedMedia
    });
  } catch (error) {
    console.error('Error creating media library:', error);
    return reply.status(500).send({
      success: false,
      message: 'Internal Server Error',
      error
    });
  }
};
