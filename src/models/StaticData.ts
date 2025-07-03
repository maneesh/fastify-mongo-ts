import mongoose, { Document, Model, Schema } from 'mongoose';

// 1. Interfaces

interface IContent {
  type: 'text' | 'image' | 'video';
  data: string;
}

interface ISection extends Document {
  name?: string;
  contents: IContent[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IStaticContent extends Document {
  domain: string;
  page: string;
  sections: ISection[];
  createdAt?: Date;   //remove timestamp  
  updatedAt?: Date;
}

// 2. Schemas

const ContentSchema: Schema<IContent> = new Schema({
  type: {
    type: String,
    enum: ['text', 'image', 'video'],
    required: true
  },
  data: {
    type: String,
    required: true
  }
}, { _id: false });

const SectionSchema: Schema<ISection> = new Schema({
  name: { type: String },
  contents: [ContentSchema]
}, {
  timestamps: true  
});

const StaticContentSchema: Schema<IStaticContent> = new Schema({
  domain: { type: String, required: true },
  page: { type: String, required: true },      
  sections: [SectionSchema]                     
}, {
  timestamps: true      //remove timestamp                    
});

// 3. Model Export

const StaticContent: Model<IStaticContent> = mongoose.models.Website as Model<IStaticContent> || mongoose.model<IStaticContent>('StaticContent', StaticContentSchema);
export default StaticContent;









