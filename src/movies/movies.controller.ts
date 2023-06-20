import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UsePipes,
  UseGuards,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './schema/movie.schema';
import { ObjectIdPipe } from 'src/pipes/ObjectIdPipe';
import { MoviePipe } from 'src/pipes/MoviePipe';
import { AuthGuard } from 'src/guards/AuthGuard';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  @UsePipes(MoviePipe)
  create(@Body() movie: Movie) {
    return this.moviesService.create(movie);
  }

  @Get()
  findAll() {
    return this.moviesService.findAll();
  }

  @Get(':id')
  @UsePipes(ObjectIdPipe)
  findOne(@Param('id') id: string) {
    return this.moviesService.findOne(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  update(@Param('id', new ObjectIdPipe()) id: string, @Body() movie: Movie) {
    return this.moviesService.update(id, movie);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @UsePipes(ObjectIdPipe)
  remove(@Param('id') id: string) {
    return this.moviesService.remove(id);
  }
}
