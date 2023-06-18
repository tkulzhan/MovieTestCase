import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Movie {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  img: string;

  @Prop()
  rating: number;
}

export type MovieDocument = Document<Movie>;
export const MovieSchema = SchemaFactory.createForClass(Movie);
