import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MoviesModule } from './movies/movies.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://tkulzhan:tkulzhan@cluster.czbqaif.mongodb.net/movietestcase?retryWrites=true&w=majority',
    ),
    MoviesModule,
  ],
})
export class AppModule {}
