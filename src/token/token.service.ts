import { TokenPayload, TokenDocument, Token } from './entity/token.entity';
import * as jwt from 'jsonwebtoken';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  Injectable,
  Inject,
  InternalServerErrorException,
  BadRequestException,
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
      const tokenValue = jwt.sign(payload, this.secret, { expiresIn: '2h' });
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

  async deleteToken(tokenValue: string) {
    try {
      const token = await this.tokenModel.findOne({ value: tokenValue });
      if (token) {
        await this.tokenModel.deleteOne({ _id: token._id });
      } else {
        throw new BadRequestException('You are not logged in');
      }
    } catch (e) {
      if (e instanceof BadRequestException) {
        throw new BadRequestException(e.message);
      }
      throw new InternalServerErrorException('Something went wrong');
    }
  }
}
