import mongoose, { Document, Model, Schema } from 'mongoose';

// Interfaces
interface IMedia {
  name: string;
  url: string;
  alt: string;
}

export interface IMediaLibrary extends Document {
  domain: string;
  folder: string[];
  media: IMedia[];
}

// Schema
const MediaSchema: Schema<IMedia> = new Schema({
  name: { type: String, required: true },
  url: { type: String, required: true },
  alt: { type: String, default: '' }
}, { _id: false });

const MediaLibrarySchema: Schema<IMediaLibrary> = new Schema({
  domain: { type: String, required: true },
  folder: { type: [String], default: [] },
  media: { type: [MediaSchema], default: [] } 
});

const MediaLibrary: Model<IMediaLibrary> =
  mongoose.models.MediaLibrary as Model<IMediaLibrary> ||
  mongoose.model<IMediaLibrary>('MediaLibrary', MediaLibrarySchema);

export default MediaLibrary;
