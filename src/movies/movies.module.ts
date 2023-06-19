import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MovieSchema, Movie } from './schema/movie.schema';
import { TokensModule } from '../tokens/tokens.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Movie.name, schema: MovieSchema }]),
    TokensModule
  ],
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule {}
