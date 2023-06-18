import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Movie {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop()
  img: string;

  @Prop({ min: 0, max: 10 })
  rating: number;
}

export type MovieDocument = Document<Movie>;
export const MovieSchema = SchemaFactory.createForClass(Movie);
