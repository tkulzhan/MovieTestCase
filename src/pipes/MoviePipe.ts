import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { Movie, MovieDocument } from 'src/movies/schema/movie.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class MoviePipe implements PipeTransform<any, Promise<MovieDocument>> {
  constructor(
    @InjectModel(Movie.name) private readonly movieModel: Model<MovieDocument>,
  ) {}

  async transform(value: any): Promise<MovieDocument> {
    const movie = new this.movieModel(value);

    const validationError = movie.validateSync();
    if (validationError) {
      throw new BadRequestException(validationError.message);
    }

    return movie;
  }
}
