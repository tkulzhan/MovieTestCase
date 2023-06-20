import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as Joi from 'joi';

@Schema()
export class Movie {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop()
  img: string;

  @Prop({ min: 1, max: 10 })
  rating: number;
}

export const MovieCreateSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  img: Joi.string().regex(/^https:\/\/.*\.(jpg|jpeg|png|gif|svg)$/i),
  rating: Joi.number().min(0).max(10),
});

export const MovieUpdateSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string(),
  img: Joi.string().regex(/^https:\/\/.*\.(jpg|jpeg|png|gif|svg)$/i),
  rating: Joi.number().min(1).max(10),
});

export type MovieQuery = {
  title?: string;
  sort?: 'asc' | 'desc' | 1 | -1;
};
export type MovieDocument = Document<Movie>;
export const MovieSchema = SchemaFactory.createForClass(Movie);
