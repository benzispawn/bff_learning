import { Schema } from 'mongoose';

export const PresentationSchema = new Schema(
  {
    primaryText: { type: String, required: true },
    carousel: { type: [Schema.Types.Mixed], default: [] },
    buttonText: { type: String, required: true },
  },
  {
    collection: 'learning_trail_presentation',
  },
);
