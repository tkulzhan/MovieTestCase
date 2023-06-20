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
  Query,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import {
  Movie,
  MovieQuery,
  MovieCreateSchema,
  MovieUpdateSchema,
} from './entity/movie.entity';
import { ObjectIdPipe } from 'src/pipes/ObjectIdPipe';
import { JoiValidationPipe } from 'src/pipes/JoiValidationPipe';
import { AuthGuard } from 'src/guards/AuthGuard';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  @UseGuards(AuthGuard)
  @UsePipes(new JoiValidationPipe(MovieCreateSchema))
  create(@Body() movie: Movie) {
    return this.moviesService.create(movie);
  }

  @Get()
  findAll(@Query() query: MovieQuery) {
    return this.moviesService.findAll(query);
  }

  @Get(':id')
  @UsePipes(ObjectIdPipe)
  findOne(@Param('id') id: string) {
    return this.moviesService.findOne(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  update(
    @Param('id', new ObjectIdPipe()) id: string,
    @Body(new JoiValidationPipe(MovieUpdateSchema)) movie: Movie,
  ) {
    return this.moviesService.update(id, movie);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @UsePipes(ObjectIdPipe)
  remove(@Param('id') id: string) {
    return this.moviesService.remove(id);
  }
}
