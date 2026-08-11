import { Schema } from 'mongoose';

export const ResearchSchema = new Schema(
  {
    title: { type: String, required: true },
  },
  {
    collection: 'learning_trail_research',
  },
);
