import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from '../../auth/entity/user.entity';

@Schema()
export class Token {
  @Prop({ required: true })
  value: string;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
  })
  user: User;
}

export type TokenPayload = {
  _id: string;
  username: string;
  email: string;
};
export type TokenDocument = mongoose.Document<Token>;
export const TokenSchema = SchemaFactory.createForClass(Token);
