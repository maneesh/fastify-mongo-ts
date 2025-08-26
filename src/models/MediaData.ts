import { Schema, model, Document } from "mongoose";

export interface IMediaItem {
  name: string;
  url: string;
  alt?: string;
  size?: string;
  type?: string;
  dimension?: string;
}

export interface IMedia extends Document {
  domain: string;
  folder: string;
  media: IMediaItem;
}

const mediaItemSchema = new Schema<IMediaItem>({
  name: { type: String, required: true },
  url: { type: String, required: true },
  type: { type: String, required: true },
  size: { type: String, required: true },
  dimension: { type: String, required: true },
  alt: { type: String }
}, { _id: false });

const mediaSchema = new Schema<IMedia>({
  domain: { type: String, required: true },
  folder: { type: String },
  media: { type: mediaItemSchema, required: true }
}, { timestamps: true });

export default model<IMedia>("MediaLibrary", mediaSchema);
