import { Schema, model, Document } from "mongoose";

interface ITextContent {
  type: "text";
  Title: string;
  data: string;
}

interface IMediaContent {
  type: "media";
  name: string;
  media_ref: string; // store ObjectId or URL depending on design
}

export type IContent = ITextContent | IMediaContent;

export interface IPageComponent extends Document {
  domain: string;
  group?: string;
  component: string;
  contents: IContent[];
}

const ContentSchema = new Schema<IContent>(
  {
    type: { type: String, enum: ["text", "media"], required: true },
    Title: { type: String,},
    name: { type: String },
     data: { 
      type: String, 
      required: function () {
        return this.type === "text"; // only required for text
      }
    },

    media_ref: { 
      type: String, 
      required: function () {
        return this.type === "media"; // only required for media
      },
      set: (val: string) => (val ? val.trim().replace(/\s+/g, "") : val) 
    },
  },
  { _id: false }
);

const PageComponentSchema = new Schema<IPageComponent>(
  {
    domain: { type: String, required: true },
    group: { type: String },
    component: { type: String, required: true },
    contents: { type: [ContentSchema], default: [] },
  },
  { timestamps: true }
);

export default model<IPageComponent>("PageComponent", PageComponentSchema);
