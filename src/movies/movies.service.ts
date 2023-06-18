import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MovieDocument, Movie } from './schema/movie.schema';
import { Model } from 'mongoose';

@Injectable()
export class MoviesService {
  constructor(
    @InjectModel(Movie.name)
    private movieModel: Model<MovieDocument>,
  ) {}

  create(movie: Movie) {
    const newMovie = new this.movieModel(movie);
    return newMovie.save();
  }

  findAll(): Promise<MovieDocument[]> {
    return this.movieModel.find().exec();
  }

  findOne(id: string) {
    return this.movieModel.findById(id);
  }

  update(id: string, movie: Movie) {
    return this.movieModel.updateOne({ _id: id }, movie);
  }

  remove(id: string) {
    return this.movieModel.deleteOne({ _id: id });
  }
}
