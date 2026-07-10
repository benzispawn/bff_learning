import { Schema } from 'mongoose';
import { HomeDocument } from './home.interface';

const ReplacementSchema = new Schema(
  {
    match: { type: String, required: true },
    value: { type: String, required: true },
    typography: { type: String, required: true },
    color: { type: String },
  },
  { _id: false },
);

const TextContentSchema = new Schema(
  {
    value: { type: String, required: true },
    typography: { type: String, required: true },
    replacements: [ReplacementSchema],
  },
  { _id: false },
);

const CarouselItemSchema = new Schema(
  {
    imageName: { type: String, required: true },
    title: { type: String, required: true },
    typography: { type: String, required: true },
  },
  { _id: false },
);

const StoryItemSchema = new Schema(
  {
    backgroundColor: { type: String, required: true },
    imageName: { type: String, required: true },
    description: { type: TextContentSchema, required: true },
  },
  { _id: false },
);

export const HomeSchema = new Schema<HomeDocument>(
  {
    stories: [StoryItemSchema],
    imageName: { type: String, required: true },
    primarytitle: { type: TextContentSchema, required: true },
    primaryText: { type: TextContentSchema, required: true },
    secondTitle: { type: TextContentSchema, required: true },
    secondaryText: { type: TextContentSchema, required: true },
    carousel: [CarouselItemSchema],
    tertiaryText: { type: TextContentSchema, required: true },
    quaternaryText: { type: TextContentSchema, required: true },
  },
  { _id: false },
);
