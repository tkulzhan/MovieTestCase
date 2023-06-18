import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { InjectModel } from '@nestjs/mongoose';
import { MovieDocument, Movie } from './schema/movie.schema';
import { Model } from 'mongoose';

@Injectable()
export class MoviesService {
  constructor(
    @InjectModel(Movie.name)
    private movieModel: Model<MovieDocument>,
  ) {}

  create(createMovieDto: CreateMovieDto) {
    const newMovie = new this.movieModel(createMovieDto);
    return newMovie.save();
  }

  findAll(): Promise<MovieDocument[]> {
    return this.movieModel.find().exec();
  }

  findOne(id: string) {
    return this.movieModel.findById(id);
  }

  update(id: string, updateMovieDto: UpdateMovieDto) {
    return this.movieModel.updateOne({ _id: id }, updateMovieDto);
  }

  remove(id: string) {
    return this.movieModel.deleteOne({ _id: id });
  }
}
