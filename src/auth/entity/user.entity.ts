import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as Joi from 'joi';

@Schema()
export class User {
  @Prop({ required: true, unique: true, minlength: 4 })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;
}

export const UserRegisterSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string()
    .regex(/^^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
    .required(),
  password: Joi.string().min(6).max(20),
});

export type UserDocument = Document<User>;
export const UserSchema = SchemaFactory.createForClass(User);
