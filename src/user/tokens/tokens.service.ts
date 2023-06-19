import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Token, TokenDocument, TokenPayload } from './schema/token.schema';
import { Model } from 'mongoose';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class TokensService {
  constructor(
    @InjectModel(Token.name)
    private tokenModel: Model<TokenDocument>,
  ) {}

  async generateToken(payload: TokenPayload) {}

  async saveToken() {}

  async validateToken() {}
}
