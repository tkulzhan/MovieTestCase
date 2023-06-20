import { TokenPayload, TokenDocument, Token } from './schema/token.schema';
import * as jwt from 'jsonwebtoken';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  Injectable,
  Inject,
  InternalServerErrorException,
} from '@nestjs/common';

@Injectable()
export class TokenService {
  constructor(
    @InjectModel(Token.name)
    private tokenModel: Model<TokenDocument>,
    @Inject('SECRET') private secret: string,
  ) {}

  async generateToken(payload: TokenPayload) {
    try {
      const tokenValue = jwt.sign(payload, this.secret, { expiresIn: '3h' });
      const token = new this.tokenModel({
        value: tokenValue,
        user: payload._id,
      });
      await this.saveToken(token);
      return tokenValue;
    } catch (e) {
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async saveToken(token: TokenDocument) {
    try {
      const oldToken = await this.tokenModel.findOne({
        user: token.get('user'),
      });
      if (oldToken) {
        oldToken.set('value', token.get('value'));
        await oldToken.save();
        return;
      }
      await token.save();
    } catch (e) {
      throw new InternalServerErrorException('Something went wrong');
    }
  }
}
