import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MovieDocument, Movie, MovieQuery } from './entity/movie.entity';
import { Model } from 'mongoose';

@Injectable()
export class MoviesService {
  constructor(
    @InjectModel(Movie.name)
    private movieModel: Model<MovieDocument>,
  ) {}

  async create(movie: Movie) {
    try {
      const newMovie = new this.movieModel(movie);
      return await newMovie.save();
    } catch (e) {
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async findAll(query: MovieQuery) {
    try {
      const { sort, title } = query;
      let findQuery = this.movieModel.find();
      if (sort) {
        findQuery = findQuery.sort({ rating: sort });
      }
      if (title) {
        findQuery = findQuery.where({
          title: { $regex: title, $options: 'i' },
        });
      }
      return await findQuery.exec();
    } catch (e) {
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async findOne(id: string) {
    try {
      return await this.movieModel.findById(id);
    } catch (e) {
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async update(id: string, movie: Movie) {
    try {
      return await this.movieModel.updateOne({ _id: id }, movie);
    } catch (e) {
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async remove(id: string) {
    try {
      return await this.movieModel.deleteOne({ _id: id });
    } catch (e) {
      throw new InternalServerErrorException('Something went wrong');
    }
  }
}
