import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Token, TokenSchema } from './schema/token.schema';
import { TokenService } from './token.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Token.name, schema: TokenSchema }]),
  ],
  providers: [
    TokenService,
    {
      provide: 'SECRET',
      useValue: process.env.SECRET || 'secret',
    },
  ],
  exports: [TokenService],
})
export class TokenModule {}
